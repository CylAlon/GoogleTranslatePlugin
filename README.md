
# Translation-GPT Chrome 扩展程序

Translation-GPT 是一个强大且易于使用的 Chrome 扩展程序，利用 OpenAI 的 GPT-3.5-turbo 模型为网页上选定的文本提供即时翻译。该扩展程序可以处理多词短语以及单词，使其成为快速翻译的多功能工具。

## 功能

- 即时翻译网页上选定的文本
- 支持复杂短语和单词
- 利用强大的 GPT-3.5-turbo 模型进行准确的翻译

## 安装

1. 克隆仓库或下载 ZIP 文件并解压。
2. 打开 Google Chrome，导航到 `chrome://extensions`。
3. 在右上角启用 "开发者模式"。
4. 点击 "加载已解压的扩展程序"，选择下载或克隆项目的目录。

## 使用

安装扩展程序后，使用它就像：

1. 在任何网页上选择你想要翻译的文本。
2. 松开鼠标按钮后，会在选定文本上方出现一个显示翻译的弹出窗口。
3. 在页面的其他任何地方点击以关闭翻译弹出窗口。

## 配置

要使用此扩展程序，你需要设置你的 OpenAI API 密钥。按照以下步骤操作：

1. 点击浏览器右上角的扩展程序图标以打开设置面板。
2. 在输入字段中输入你的 OpenAI API 密钥。
3. 点击 "保存" 按钮。如果密钥有效，你将看到成功消息。

## 技术细节

Translation-GPT 扩展程序采用现代 JavaScript 实践构建。它为管理翻译弹出窗口创建了 `TranslatorPopup` 类的新实例。该类处理创建和删除弹出窗口，以及与 OpenAI API 通信以获取翻译。

