# 导航站视觉优化（2026-10-19）

使用内置 imagegen 生成素材，WebP 为缩小压缩版本。机器人参考用户提供的品牌截图改绘，并非原始品牌源文件；场景图为生成的示意素材。

- `assets/brand-robot-original.gif`：参考站原版透明机器人动画与圆形背景，移除额外 CSS 动效；减少动态效果时显示同造型静态帧。详见 `logo-update.md`。
- `assets/operations-field.webp`：农机作业场景。
- `assets/sensing-field.webp`：田间气象站场景。
- 页脚两端展开、版权严格居中；手机端品牌、联系方式、版权纵向排列。未提供真实联系渠道，移除模拟二维码，保留待更新说明。
- 慧感知名称、说明和按钮已同步；历史记录按稳定 ID 读取当前名称，旧记录无需迁移。

## 生成提示词

### 农田运营

Use case: photorealistic-natural. Asset: agricultural website card background, wide 3:1 landscape. A realistic red tractor working along neat green agricultural field rows in rural eastern China, oblique aerial view, tractor at center-right, natural muted green and blue palette, soft daylight, detailed real textures. Keep subject visible in a shallow horizontal crop, left lower area quieter for white text overlay. No text, logos, borders, watermarks or UI. Output one image.

### 田间感知

Use case: photorealistic-natural. Asset: agricultural website card background, wide 3:1 landscape. Realistic compact field weather station with solar panel, radiation shield and wind sensor standing in lush rice paddies in rural eastern China, station at center-right, natural muted green and blue palette, soft daylight, distant low hills. Keep whole station within shallow horizontal composition, left lower area quieter for white overlay text. No text, logos, borders, watermarks or UI. Output one image.

### 机器人

Use case: logo-brand. Asset: simplified navbar mascot derived from reference screenshot. Recreate only the small friendly white and blue round robot inside the red outlined area of the screenshot: white spherical head, shiny blue face screen with two friendly bright cyan eyes and small smile, small red side ears, tiny antenna, compact white body and feet, arms. Preserve that character identity and front-facing pose. Centered isolated mascot filling 85% of a square image on genuinely transparent background. No circular background, no pedestal, no surrounding UI, no red rectangle, no text, no watermark. Clean 3D rendered edges, legible at 48px. This is an adaptation for a small navbar.

## 验证

Chromium：1920、1440、1024、768、640、390、320px 无横向溢出；桌面版权居中；图片正常加载；搜索、分类、空状态重置、访问记录刷新恢复及清空；减少动态效果；页面与资源错误为零。

`node --check js/portal.js` 与 `git diff --check` 通过。本项目是无构建的静态 HTML/CSS/JS，无 npm typecheck/build 命令。未改动或验证外部业务应用。

