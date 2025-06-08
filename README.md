# Gyazo Image Uploader

A plugin that seamlessly integrates Gyazo with Obsidian, allowing you to easily upload and share images, similar to Scrapbox's functionality.

## Features

- Upload images directly from your clipboard to Gyazo
- Automatically insert Markdown image links into your notes
- Simple and intuitive interface with ribbon icon and command palette support
- Secure API token management through settings

## Installation

1. Open Obsidian Settings
2. Go to Community Plugins and turn off Safe Mode
3. Click Browse and search for "Obsidian Gyazo"
4. Click Install
5. Enable the plugin

## Setup

1. Get your Gyazo API access token:
   - Log in to your Gyazo account
   - Go to [Gyazo Developer Settings](https://gyazo.com/oauth/applications)
   - Create a new application or use an existing one
   - Copy your access token

2. Configure the plugin:
   - Open Obsidian Settings
   - Go to Community Plugins > Obsidian Gyazo
   - Paste your Gyazo access token in the settings

## Usage

### Upload from Clipboard

1. Copy an image to your clipboard
2. Use one of these methods to upload:
   - Click the image icon in the left ribbon
   - Use the command palette (Ctrl/Cmd + P) and search for "Upload to Gyazo"
3. The plugin will automatically insert a Markdown image link at your cursor position

![demo](demo.gif)

### Image Link Format

The plugin inserts images in the following format:
```markdown
![image_id](https://i.gyazo.com/image_id.png)
```

## API Reference

The plugin uses the Gyazo API for image uploads. Here's the API endpoint specification:

```bash
$ curl -i https://upload.gyazo.com/api/upload -F "access_token=YOUR_ACCESS_TOKEN" \
  -F "imagedata=@/path/to/image.png"

HTTP/1.1 200 OK

{
    "image_id" : "8980c52421e452ac3355ca3e5cfe7a0c",
    "permalink_url": "http://gyazo.com/8980c52421e452ac3355ca3e5cfe7a0c",
    "thumb_url" : "https://i.gyazo.com/thumb/180/afaiefnaf.png",
    "url" : "https://i.gyazo.com/8980c52421e452ac3355ca3e5cfe7a0c.png",
    "type": "png"
}
```

## Error Handling

The plugin provides clear feedback for common issues:
- Missing API token
- No image in clipboard
- Upload failures
- Network errors

## Support

If you encounter any issues or have suggestions for improvements, please:
1. Check the [GitHub Issues](https://github.com/tsumac/obsidian-gyazo/issues)
2. Create a new issue if your problem hasn't been reported

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
