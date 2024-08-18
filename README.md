> 这个fork中主要根据我的需求做了一些修改，但工作繁忙，暂时没空往官方仓库中提交pr，有需要的可以自行使用，后续也会持续合并主干中的修改进来。<br>
> 主要修改如下：<br>
> - machine learning模块支持cn_clip(https://github.com/OFA-Sys/Chinese-CLIP)
> - geocode支持高德地图api(在.env中增加GEOCODE_WITH_AMAP=true AMAP_GEOCODE_KEYS=key1,key2)
> - 页面侧边栏改为窄模式
> - 修复了一些bug(ios移动端下载视频失败、移动端搜索展示数量太少等)
> - 搜索支持日期搜索(20240202搜索某一天，20240202-20240302搜索一个区间)

> This fork mainly makes some modifications according to my needs, but I'm busy with work and don't have time to submit a PR to the official repository for now. Those in need can use it themselves, and I will continue to merge modifications from the main branch in the future.<br>
> The main modifications are as follows:<br>
> - The machine learning module supports cn_clip (https://github.com/OFA-Sys/Chinese-CLIP)
> - Geocode supports the Amap API (add GEOCODE_WITH_AMAP=true AMAP_GEOCODE_KEYS=key1,key2 in .env)
> - The page sidebar has been changed to a narrow mode
> - Fixed some bugs (failure to download videos on iOS mobile end, too few search displays on mobile end, etc.)
> - Search supports date search (search for a specific day with 20240202, search for a range with 20240202-20240302)

<p align="center"> 
  <br/>  
  <a href="https://opensource.org/license/agpl-v3"><img src="https://img.shields.io/badge/License-AGPL_v3-blue.svg?color=3F51B5&style=for-the-badge&label=License&logoColor=000000&labelColor=ececec" alt="License: AGPLv3"></a>
  <a href="https://discord.immich.app">
    <img src="https://img.shields.io/discord/979116623879368755.svg?label=Discord&logo=Discord&style=for-the-badge&logoColor=000000&labelColor=ececec" alt="Discord"/>
  </a>
  <br/>  
  <br/>   
</p>

<p align="center">
<img src="design/immich-logo-stacked-light.svg" width="300" title="Login With Custom URL">
</p>
<h3 align="center">High performance self-hosted photo and video management solution</h3>
<br/>
<a href="https://immich.app">
<img src="design/immich-screenshots.png" title="Main Screenshot">
</a>
<br/>
<p align="center">

<a href="readme_i18n/README_ca_ES.md">Català</a>
<a href="readme_i18n/README_es_ES.md">Español</a>
<a href="readme_i18n/README_fr_FR.md">Français</a>
<a href="readme_i18n/README_it_IT.md">Italiano</a>
<a href="readme_i18n/README_ja_JP.md">日本語</a>
<a href="readme_i18n/README_ko_KR.md">한국어</a>
<a href="readme_i18n/README_de_DE.md">Deutsch</a>
<a href="readme_i18n/README_nl_NL.md">Nederlands</a>
<a href="readme_i18n/README_tr_TR.md">Türkçe</a>
<a href="readme_i18n/README_zh_CN.md">中文</a>
<a href="readme_i18n/README_ru_RU.md">Русский</a>
<a href="readme_i18n/README_pt_BR.md">Português Brasileiro</a>
<a href="readme_i18n/README_sv_SE.md">Svenska</a>
<a href="readme_i18n/README_ar_JO.md">العربية</a>

</p>

## Disclaimer

- ⚠️ The project is under **very active** development.
- ⚠️ Expect bugs and breaking changes.
- ⚠️ **Do not use the app as the only way to store your photos and videos.**
- ⚠️ Always follow [3-2-1](https://www.backblaze.com/blog/the-3-2-1-backup-strategy/) backup plan for your precious photos and videos!

> [!NOTE]
> You can find the main documentation, including installation guides, at https://immich.app/.

## Links

- [Documentation](https://immich.app/docs)
- [About](https://immich.app/docs/overview/introduction)
- [Installation](https://immich.app/docs/install/requirements)
- [Roadmap](https://immich.app/roadmap)
- [Demo](#demo)
- [Features](#features)
- [Translations](https://immich.app/docs/developer/translations)
- [Contributing](https://immich.app/docs/overview/support-the-project)

## Demo

Access the demo [here](https://demo.immich.app). The demo is running on a Free-tier Oracle VM in Amsterdam with a 2.4Ghz quad-core ARM64 CPU and 24GB RAM.

For the mobile app, you can use `https://demo.immich.app/api` for the `Server Endpoint URL`

### Login credentials

| Email           | Password |
| --------------- | -------- |
| demo@immich.app | demo     |

## Features

| Features                                     | Mobile | Web |
| :------------------------------------------- | ------ | --- |
| Upload and view videos and photos            | Yes    | Yes |
| Auto backup when the app is opened           | Yes    | N/A |
| Prevent duplication of assets                | Yes    | Yes |
| Selective album(s) for backup                | Yes    | N/A |
| Download photos and videos to local device   | Yes    | Yes |
| Multi-user support                           | Yes    | Yes |
| Album and Shared albums                      | Yes    | Yes |
| Scrubbable/draggable scrollbar               | Yes    | Yes |
| Support raw formats                          | Yes    | Yes |
| Metadata view (EXIF, map)                    | Yes    | Yes |
| Search by metadata, objects, faces, and CLIP | Yes    | Yes |
| Administrative functions (user management)   | No     | Yes |
| Background backup                            | Yes    | N/A |
| Virtual scroll                               | Yes    | Yes |
| OAuth support                                | Yes    | Yes |
| API Keys                                     | N/A    | Yes |
| LivePhoto/MotionPhoto backup and playback    | Yes    | Yes |
| Support 360 degree image display             | No     | Yes |
| User-defined storage structure               | Yes    | Yes |
| Public Sharing                               | No     | Yes |
| Archive and Favorites                        | Yes    | Yes |
| Global Map                                   | Yes    | Yes |
| Partner Sharing                              | Yes    | Yes |
| Facial recognition and clustering            | Yes    | Yes |
| Memories (x years ago)                       | Yes    | Yes |
| Offline support                              | Yes    | No  |
| Read-only gallery                            | Yes    | Yes |
| Stacked Photos                               | Yes    | Yes |

## Translations

Read more about translations [here](https://immich.app/docs/developer/translations).

<a href="https://hosted.weblate.org/engage/immich/">
<img src="https://hosted.weblate.org/widget/immich/immich/multi-auto.svg" alt="Translation status" />
</a>

## Repository activity

![Activities](https://repobeats.axiom.co/api/embed/9e86d9dc3ddd137161f2f6d2e758d7863b1789cb.svg "Repobeats analytics image")

## Star history

<a href="https://star-history.com/#immich-app/immich&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=immich-app/immich&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=immich-app/immich&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=immich-app/immich&type=Date" width="100%" />
 </picture>
</a>

## Contributors

<a href="https://github.com/alextran1502/immich/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=immich-app/immich" width="100%"/>
</a>
