# Hands Sequence Video Frames

Place your scroll-scrubbed image frames in this directory.

## File Naming Convention
- `frame_001.jpg`
- `frame_002.jpg`
- `frame_003.jpg`
- ... up to `frame_090.jpg`

## Recommended Specifications
- **Aspect Ratio**: 16:9 or 4:3 (e.g. 1920x1080 or 1280x720)
- **Format**: High-quality JPG or WebP (compression quality ~80-85% for fast web loading, around 40-70KB per frame)
- **Total frames**: 60 to 90 frames for optimal scroll scrubbing feel

## FFmpeg Extraction Command
If you have a video clip (e.g., `hands_reaching.mp4`), extract 90 frames using this command:

```bash
ffmpeg -i hands_reaching.mp4 -vf "fps=30,scale=1280:-1" -q:v 3 frame_%03d.jpg
```

Or for 60 frames:
```bash
ffmpeg -i hands_reaching.mp4 -vf "fps=24,scale=1280:-1" -q:v 3 frame_%03d.jpg
```

When files are placed here, the landing page will automatically switch from procedural 3D hands to scrubbing your video sequence smoothly on an HTML5 canvas!
