const keyName = 'api_key'
let exec_flag = false;
class TranslatorPopup {
  constructor() {
    this.url = 'https://api.openai.com/v1/chat/completions';

    this.model = 'gpt-3.5-turbo';
    this.play = '你现在是一个翻译官，你只负责翻译用户问的话。你只返回翻译结果，不要携带其他内容！\
    如果输出内容较长，你适当换行，换行使用<br>代替。如果只有一个单词，那么你将这个单词常用的3到5个翻译返回。\
    假如用户的数据中存在专业词汇，例如lora、lorawan、ADC、UART等请不要翻译。';
    this.divElement = null;
  }

  async translate(text) {
    let data = {
      "model": this.model,
      "messages": [
        {
          "role": "system",
          "content": this.play
        },
        {
          "role": "user",
          "content": "将下列内容翻译成中文：\r\n" + text
        }
      ]
    };

    try {
      let key = ''
      let getKeyPromise = new Promise((resolve, reject) => {
        chrome.storage.sync.get([keyName], function (result) {
          key = result[keyName];
          if (key.length < 32) {
            reject('请设置api_key!!!');
          } else {
            resolve(key);
          }
        });
      });
      key = await getKeyPromise;
      let headers = {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${key}`
      };
      const response = await this.postData(this.url, data, headers);
      let v = null;
      if (response) {
        v = response.choices;
        if (v.length > 0) {
          v = v[0].message.content;
        }
      }
      return v || 'error:访问失败！';
    } catch (e) {
      return 'error:访问超时！';
    }
  }

  async postData(url, data, headers = {}) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers, // Merge any additional headers provided with the default headers
      },
      body: JSON.stringify(data), // Convert data to JSON string
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json(); // Parse and return the response data as JSON
  }

  createPopup(flag, x, y, width) {

    this.divElement = document.createElement("div");
    this.divElement.textContent = `loading...`;
    this.divElement.style.cssText = `
    position: fixed;
    background-color: #606266;
    color: #ffffff;
    font-size: 14px;
    line-height: 1.5; /* 设置文字的上下间距为 1.5 倍文字大小 */
    border-radius: 4px;
    padding: 4px;
    max-width:${flag ? 'auto' : width + "px"} ;
    pointer-events: none;
    z-index: 9999;
    left: ${x}px;
    bottom: calc(100vh - ${y - 8}px);
    white-space: pre-wrap;
    `;

    document.body.appendChild(this.divElement);

  }
  removePopup() {
    if (this.divElement) {
      document.body.removeChild(this.divElement);
      this.divElement = null;
    }
  }
}


// Initialize the translator
const translator = new TranslatorPopup();

// Create and remove popup on text selection
document.addEventListener("mouseup", async function (event) {
  const selectedText = window.getSelection().toString();
  if (exec_flag) {
    exec_flag = false;
    return;
  }
  if (selectedText) {
    exec_flag = true;
    const selectionRange = window.getSelection().getRangeAt(0);
    const rect = selectionRange.getBoundingClientRect();
    const width = rect.right - rect.left;
    const wordCount = selectedText.match(/\w+/g);
    let flag = false;
    if (wordCount.length < 4) {
      flag = true;
    }

    translator.createPopup(flag, rect.left, rect.top, width);
    const translation = await translator.translate(selectedText);
    translator.divElement.textContent = translation;

  } else {
    translator.removePopup();
  }
});

// Remove popup on mousedown
document.addEventListener("mousedown", function () {
  translator.removePopup();
});




document.addEventListener("DOMContentLoaded", function () {
  // 获取按钮实例
  let input_api_key = document.getElementById('input_api_key');
  let save_api_key = document.getElementById("save_api_key");
  let hint = document.getElementById("hint");

  // 确保元素存在
  if (input_api_key && save_api_key && hint) {
    // 点击按钮
    save_api_key.addEventListener("click", () => {
      let value = input_api_key.value;
      chrome.storage.sync.set({ [keyName]: value });
      hint.textContent = '成功'

      // chrome.storage.sync.get([keyName], function (result) {
      //   alert(result[keyName]);
      // });
    });
  }
});

