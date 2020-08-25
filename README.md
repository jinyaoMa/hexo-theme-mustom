# hexo-theme-mustom

看效果点这里：[blog.ma-jinyao.cn](//blog.ma-jinyao.cn)

想用最新版的主题的话，可以把我的[整个网站](//github.com/jinyaoMa/my-hexo-site)下载下来慢慢改

更详细的使用指南：[Hexo主题Mustom使用指南](//blog.ma-jinyao.cn/posts/49651/)

如果想用 [blog.ma-jinyao.cn](//blog.ma-jinyao.cn) 里 菜单-其他 下 pages 的 parts，可以参考 [我的博客](https://github.com/jinyaoMa/my-hexo-site) 主目录下 source 里的文件、Front-matter 和目录结构。

_Hexo 主目录 \_config.yml 模版在页面底下_

## 关于本主题

- 主题只使用了 valine 评论
- 主题 _config.yml 没有任何的开关，比如开关翻译功能、开关评论功能等等
- 主题 _config.yml 里可以更换图片头像、链接、图标等等

## 添加菜单项目（layout/page only）

在主题 _config.yml 中，按格式修改 menus下的项目

``` yaml
menus:
  main: # 项目组
    home: # 项目
      url: / # 项目链接
      icon: '<i class="fas fa-home fa-fw"></i>' # 项目图标
    archive: # 项目
      url: /archives/ # 项目链接
      icon: '<i class="fas fa-archive fa-fw"></i>' # 项目图标
    about: # 项目
      url: /about/ # 项目链接
      icon: '<i class="fas fa-user fa-fw"></i>' # 项目图标
    links: # 新项目 <----------------------------------------------------
      url: /links/  # 新项目链接 <----------------------------------------
      icon: '<i class="fas fa-link fa-fw"></i>' # 新项目图标 <------------
```

接下来，在主题 source/asset/lang 文件夹中的 .yml 语言文件修改 menus 下的项目

``` yaml
menus:
  main: # 对应_config.yml中的项目组
    caption: 本站 # 项目组名称
    items: # 对应_config.yml中的项目
      home: 首页 # 项目名称
      archive: 归档 # 项目名称
      about: 关于 # 项目名称
      links: 友链 # 新项目名称 <-----------------------------------------
# ...
pather:
  links: 友链 # 新项目名称 <-----------------------------------------
```

使用这个 scaffold 生成新 page

``` yaml
---
title: {{ title }}
layout: page
name: {{ title }} # this name should be the same as folder name
parts: 
  - page
  - # custom parts
---
```

``` bash
hexo new page "新页面名称"
```

如果想自定义新 parts 的话，请根据 source/asset 里的文件目录结构自行摸索

添加新 parts 之后，需要在 layout/_partial/frame.ejs 中插入对应 part 名称的标签

## 更多

修改主题 _config.yml
``` yaml
meting: # 对应meting.js设置
  server: netease
  type: playlist
  id: "970057720"
  theme: "#ff3300"
  list_height: "297px" # 改这个之后还要跑source/asset/css/_common/dimension.styl里改$audioplayer_list_height
  
# 下面这两个可以参考 https://github.com/lavas-project/hexo-pwa
manifest:
serviceWorker:

# 改post中二维码
post:
  qrcode:
    qq: /asset/img/qq.png
    wechat: /asset/img/wechat.png

# 增加皮肤可以自行摸索（css中没有怎么分色，还是黑白好看，夜间模式更好看。。。）
skin:
  default: "#000000"
  colorful: "linear-gradient(to bottom right,#ff3333 ,#66cc66 , #0099cc)"
  newSkin: # 需要对应source/asset/css/_common/color.styl中的class
```

## 主目录 _config.yml 例子

``` yaml
# Site
title: "耀 の 个人网站 | Mark の Personal Website"
description: "耀 の 个人网站 | Mark の Personal Website"
author: jinyaoMa ( 耀 / Mark )
year: 2019

# URL
url: https://blog.ma-jinyao.cn
root: /

# Directory
source_dir: source
public_dir: docs # 方便使用Github Page
tag_dir: tags
archive_dir: archives
category_dir: categories
code_dir: code # markdown使用include_code标签
skip_render:
  - "code/*.*" # 排除code_dir
  - "extension/**/*.html" # 排除extension
  - "*.html" # 如果在在主目录source文件夹里放了搜索引擎验证的.html文件
  - "CNAME" # 如果在在主目录source文件夹里放了CNAME文件

# Writing
new_post_name: :title.md # File name of new posts
default_layout: post
titlecase: false # Transform title into titlecase
external_link:
  enable: true # Open external links in new tab
  field: site # Apply to the whole site
  exclude: ""
filename_case: 0
render_drafts: false
post_asset_folder: false
relative_link: false
future: true
highlight:
  enable: true
  line_number: true
  auto_detect: false
  tab_replace: "  "
  wrap: true
  hljs: false

# Date / Time format
date_format: YYYY-MM-DD
time_format: HH:mm:ss
## Use post's date for updated date unless set in front-matter
use_date_for_updated: false

# Extensions
## Plugins: https://hexo.io/plugins/
## Themes: https://hexo.io/themes/
theme: mustom

# Deployment
## Docs: https://hexo.io/docs/deployment.html
deploy:
  - type: baidu_url_submitter
  - type: git
    repo:

all_minifier: true # 如果装了 hexo-all-minifier
nofollow: # 如果装了 hexo-filter-nofollow
  enable: true
  field: post
sitemap: # 如果装了 hexo-generator-sitemap
  path: sitemap.xml
  rel: true
autoprefixer: # 如果装了 hexo-autoprefixer
  exclude:
    - "*.min.css"
  overrideBrowserslist:
    - "last 2 versions"
babelify: # 如果装了 hexo-renderer-babelify + @babel/preset-env
  presets:
    - "@babel/preset-env"
  sourceMaps: true

ignore:
  #- "**/source/asset/js/common/*.js" # 如果装了 hexo-renderer-babelify
  #- "**/source/asset/js/part/*.js" # 如果装了 hexo-renderer-babelify
  #- "**/source/asset/js/plugin/!(L2Dwidget.0.min.js)" # 如果装了 hexo-renderer-babelify

# 百度主动推送
baidu_url_submit:
  count: 1000 # 提交最新的一个链接
  host: ma-jinyao.cn # 在百度站长平台中注册的域名
  token: "" # 请注意这是您的秘钥， 所以请不要把博客源代码发布在公众仓库里!
  path: baidu_urls.txt # 文本文档的地址， 新链接会保存在此文本文档里

# 百度翻译API
baidu_translate:
  appid: ""
  appkey: ""

# 主题用的Valine评论
valine:
  appid: ""
  appkey: ""

# 搜索引擎验证
google_site_verification: ""
baidu_site_verification: ""

```
