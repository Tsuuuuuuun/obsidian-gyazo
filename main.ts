import { App, Editor, MarkdownView, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

interface GyazoPluginSettings {
	accessToken: string;
}

const DEFAULT_SETTINGS: GyazoPluginSettings = {
	accessToken: ''
}

export default class GyazoPlugin extends Plugin {
	settings: GyazoPluginSettings;

	async onload() {
		await this.loadSettings();

		// リボンアイコンを追加
		this.addRibbonIcon('image', 'Upload to Gyazo', async () => {
			await this.uploadToGyazo();
		});

		// コマンドを追加
		this.addCommand({
			id: 'upload-to-gyazo',
			name: 'Upload to Gyazo',
			editorCallback: async (editor: Editor, view: MarkdownView) => {
				await this.uploadToGyazo();
			}
		});

		// 設定タブを追加
		this.addSettingTab(new GyazoSettingTab(this.app, this));
	}

	onunload() {
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	async uploadToGyazo() {
		if (!this.settings.accessToken) {
			new Notice('Please set your Gyazo access token in the settings.');
			return;
		}

		try {
			// クリップボードから画像を取得
			const clipboardItems = await navigator.clipboard.read();
			const imageItem = clipboardItems.find(item => item.types.includes('image/png') || item.types.includes('image/jpeg'));
			
			if (!imageItem) {
				new Notice('No image found in clipboard.');
				return;
			}

			const imageBlob = await imageItem.getType('image/png');
			const formData = new FormData();
			formData.append('access_token', this.settings.accessToken);
			formData.append('imagedata', imageBlob);

			const response = await fetch('https://upload.gyazo.com/api/upload', {
				method: 'POST',
				body: formData
			});

			if (!response.ok) {
				throw new Error('Failed to upload image');
			}

			const data = await response.json();
			const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
			
			if (activeView) {
				const editor = activeView.editor;
				const markdown = `![${data.image_id}](${data.url})`;
				editor.replaceSelection(markdown);
				new Notice('Image uploaded successfully!');
			}
		} catch (error) {
			new Notice('Failed to upload image: ' + error.message);
		}
	}
}

class GyazoSettingTab extends PluginSettingTab {
	plugin: GyazoPlugin;

	constructor(app: App, plugin: GyazoPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;
		containerEl.empty();

		new Setting(containerEl)
			.setName('Gyazo Access Token')
			.setDesc('Enter your Gyazo access token')
			.addText(text => text
				.setPlaceholder('Enter your access token')
				.setValue(this.plugin.settings.accessToken)
				.onChange(async (value) => {
					this.plugin.settings.accessToken = value;
					await this.plugin.saveSettings();
				}));
	}
}
