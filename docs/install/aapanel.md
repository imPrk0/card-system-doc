# 宝塔面板 / aaPanel 安装教程 {#title}

本文将会介绍在如何在&nbsp;“[宝塔面板](https://www.bt.cn)”&nbsp;或&nbsp;“[aaPanel](https://www.aapanel.com)”&nbsp;如何安装网站程序。

::: info 版本更新说明

本项目自 [3.20](/changelog/v3.html#3-20) 版本起，正式更新到 PHP 8.2 ~ 8.5，Laravel 框架更新至 12 版本，之前的版本基于 PHP 7 的 Laravel 5.5 框架开发，所以在部署环境上有一定的差异，本文档将会分别介绍在宝塔面板下部署的方式。

:::


## 一、部署环境 {#environment}

“[宝塔面板](https://www.bt.cn)”&nbsp;或&nbsp;“[aaPanel](https://www.aapanel.com)”&nbsp;有着&nbsp;Linux&nbsp;与&nbsp;Windows&nbsp;版，功能大同小异。


### 1. 安装面板 {#install-aapanel}

因为安装过程过分简单，如需帮助请查阅官方文档：

- [快速安装宝塔面板（BT Panel） | 宝塔面板官方文档](https://docs.bt.cn/getting-started/quick-installation-of-bt-panel/)
- [Quick Start | Comprehensive aaPanel Documentation: Guides, Tutorials, API, and Resources # Before Installation](https://docs.bt.cn/getting-started/before-installation/)

以 Debian 为例：

![](/assets/images/Screenshot_2026-10-24_at_23.33.11.png)

在安装过程中找到 “面板账户登录信息”，重点记录 “username” 与 “password”，它们分别是登录时所需的用户名与密码。


### 2. 登录面板并部署环境 {#deploy-environment}


#### 2.1 安装环境 {#deploy-environment-install}

首次登录宝塔面板 / aaPanel，系统会提示你安装环境，这里最核心的运行环境是：

| 软件 | 版本 | 备注说明 |
| :---: | :---: | :--- |
| PHP | `8.2` ~ `8.5` | 需根据 [漏洞](/notice/2026/10/critical-vulnerabilities-in-php-php2shell.html#check-php-version) 修改版本 |
| MySQL | `5.7+` | 如果硬件资源足够，可使用 `8.0` / `8.4` 等更新版本 |

::: details [3.20](/changelog/v3.html#3-20) 之前版本 (不含 3.20)

如果你使用的是基于 Laravel 5.5 的旧版本，那么请使用下面的环境：

| 软件 | 版本 | 备注说明 |
| :---: | :---: | :--- |
| PHP | `7.0` | 推荐 `7.3` |
| MySQL | `5.6+` | 推荐 `5.7` |

_[PHP 5.6.X 即将停止安全支持](https://www.secrss.com/articles/5703)_

⚠️ 使用旧版本的需要注意，你必须参照 [漏洞](/notice/2026/10/critical-vulnerabilities-in-php-php2shell.html#fix-patch) 对 PHP 进行补丁。

:::

至于服务器软件是选择 Nginx 还是 Apache 就要根据你的实际情况进行判断，Nginx 非常适合新手小白，推荐默认版本使用，至于 Apache 适合懂一点技术的用户。

![](/assets/images/Screenshot_2026-10-24_at_23.38.43.png)

注意，有关于 “安装方式”，宝塔面板 / aaPanel 给出了 “极速安装” 与 “编译安装”，根据实际测试，两者在兵法性能下差异并不算大，建议选择 “编译安装”，不过需要等待较长时间。


#### 2.2

### 4) PHP 函数禁用

因为使用宝塔面板的小白众多，通常不觉得麻烦的非小白通常会自己搭建环境，使用脚本、手动搭建、Docker、K8S 等，所以宝塔面板为了让小白用户的网站也能获得到一定的安全性，又怕小白不会设置，默认会禁用一些函数。那么我们需要移除 Laravel 框架所需要使用且被宝塔面板默认禁用掉的 PHP 函数，以防因为函数被禁用而导致程序运行异常。

_你可以删除宝塔面板对应 PHP 版本的函数禁用里面的所有函数，当然，这是不被推荐的！你可以移除掉下面列出的函数或是在后续的报错中将报错的函数移除掉。_


**Laravel 需要的危险 PHP 函数有**：

1. exec
2. passthru
3. system
4. popen
5. proc_open
6. shell_exec
7. pcntl_exec
8. eval
9. preg_replace
10. create_function
11. show_source
12. ini_set
13. highlight_file
14. putenv


**Laravel 需要的基础 PHP 函数有**：

1. mbstring
2. tokenizer
3. openssl
4. JSON
5. ctype
6. BCMath
7. GD
8. PDO
9. XML
10. fileinfo
11. iconv
12. curl
13. exif
14. zip
15. FTP
16. Phar

宝塔面板中，请到 **左侧导航栏【软件商店】->顶端搜索栏下方【已安装】->对应的 PHP 版本的右侧【设置】->【禁用函数】** 中，这里是不可以搜索的！值得注意的是不要将上面的添加当作搜索！你可以使用浏览器的搜索功能（通常为：`Ctrl+F` 快捷键）或是用眼睛找，将上方 “**Laravel 需要的危险 PHP 函数**” 里面的内容依次找到后删除。通常情况下不会出现 **Laravel 需要的基础 PHP 函数**，列出来是为了方便大家更好的排错。

![](/assets/images/20230130005754.png)


## 二、建站


### 1) 创建网站

宝塔面板中，请到 **左侧导航栏【网站】->顶部【PHP项目】->网站列表上方【添加站点】** 中创建网站（目前尚不支持 “一键部署” 功能，如果未来支持会在此处贴出方法）。

根据下面的信息填写内容：

 - **域名**：这里请填写你的网站域名，前后不要带 `http(s)://` 和 `/`，要分清 URL、URI、域名。
 - 备注：可填可不填，比如：`XX的正版软件注册码商店`
 - **根目录**：可以用默认的，也可以自己设置，通常只是为了自己好找，或是为了备份方便直接存放到了挂载着各大云计算厂商的对象存储的目录下等，完全按照自己的使用需求进行设置就好了。
 - FTP：不建议开启！一般维护网站直接用面板就好了，通常不会出现 FTP 的使用场景。且 FTP 会出现密码爆破。
 - 数据库：这个必须要创建！依次选择 `MySQL`、`utf8mb4`，数据库账号和密码自己可以记住或是记不住，建议越难越好或是使用默认生成的。
 - PHP 版本：根据配置的环境选择，比如我这里选择 `PHP-73`
 - 网站分类：一般 `默认分类` 就好，有些人是网站多的就选择了 `商城`。

![](/assets/images/20230130005434.png)


### 2) 下载并部署源码

如果你更愿意使用**命令行**，可以直接使用如下命令以下载、解压部署、配置目录权限一条龙操作完成。当然，我们也恨鼓励你使用命令行。因为这相比图形界面更加简单！

**境外（非中国大陆）服务器的配置方法**：
_因网络环境原因，中国大陆的服务器可能无法从 GitHub 下载！通常表现为进度条不走动。_

``` sh
# 进入你的网站目录（需要将 /www/wwwroot/example.com 替换为你自己的网站目录）
cd /www/wwwroot/example.com

curl -L -o card_release.tar.gz https://github.com/Tai7sy/card-system/releases/download/3.0/card_release.tar.gz && tar -zxf card_release.tar.gz && \cp -rf card_system_free_dist/. . && rm -rf card_system_free_dist card_release.tar.gz
chmod -R 777 storage/
chmod -R 777 bootstrap/cache/
```

**境内（中国大陆）服务器的配置方法**：
_因部分原因，当前使用国内的源会出现不稳定或慢的情况，后期会换。_

``` sh
# 进入你的网站目录（需要将 /www/wwwroot/example.com 替换为你自己的网站目录）
cd /www/wwwroot/example.com

curl -L -o card_release.tar.gz %CN_DOWN_URL% && tar -zxf card_release.tar.gz && \cp -rf card_system_free_dist/. . && rm -rf card_system_free_dist card_release.tar.gz
chmod -R 777 storage/
chmod -R 777 bootstrap/cache/
```

---

**下面是使用宝塔面板图形界面的方法，如果你使用了上面的命令行，那么可以略过下面的内容。**

在网站列表中，点击对应网站的根目录，进入文件页面。点击上方菜单，选择【**远程下载**】->【**从URL链接下载**】。

**境外（非中国大陆）服务器的配置方法**：
_因网络环境原因，中国大陆的服务器可能无法从 GitHub 下载！通常表现为进度条不走动。_

 - **URL地址**：`https://github.com/Tai7sy/card-system/releases/download/3.0/card_release.tar.gz`
 - **下载到**：不用动，就这个网站的目录就对了（一定是网站的根目录）
 - **文件名**：`card_release.tar.gz`


**境内（中国大陆）服务器的配置方法**：
_因部分原因，当前使用国内的源会出现不稳定或慢的情况，后期会换。_

 - **URL地址**：`%CN_DOWN_URL%`
 - **下载到**：不用动，就这个网站的目录就对了（一定是网站的根目录）
 - **文件名**：`card_release.tar.gz`

完成之后点击【**确认**】按钮，并等待下载完成。

<!-- 404 Not Found. -->

下载完成后，右键 “**card_release.tar.gz**” 文件，点击 “**解压**”，都留默认设置不用改动即可，点击【**解压**】按钮，并等待解压操作完成。

解压完成后，进入 “**card_system_free_dist**” 文件夹，点击文件列表表头最左上角的方框，即全选文件，并单击右上角的 “**剪切**” 按钮。再点击上方文件目录栏的最左侧（**根目录** 文字左边的左箭头，**←**），再次点击右上角的 “**粘贴**” 按钮。

粘贴完成后，你可以点击 “**card_system_free_dist**” 文件夹与 “**card_release.tar.gz**” 文件，并点击右上角的【**删除**】按钮以删除无用文件（你也可以不删除）。

右键 “**storage**” 文件夹，点选 “**权限**” 选项卡，在弹出的菜单中，将下面的输入框中的 `755` 改成 `777`，所有者选成 `root`，并确保 “**应用到子目录**” 是被勾选的。当都完成后，点击【**确定**】按钮，即可完成权限设置操作。

进入 “**bootstrap**” 文件夹，再右键 “**cache**” 文件夹，点选 “**权限**” 选项卡，在弹出的菜单中，将下面的输入框中的 `755` 改成 `777`，所有者选成 `root`，并确保 “**应用到子目录**” 是被勾选的。当都完成后，点击【**确定**】按钮，即可完成权限设置操作。

![](/assets/images/20230130010317.png)

其实如果你在使用命令行，那么很快就能完成。有些时候，图形化界面并不一定比命令行要快。


### 3) 配置环境变量并构建数据库

如果你是命令行，请输入如下命令将环境变量示例文件重命名复制为 `.env`：

``` sh
# 进入你的网站目录（需要将 /www/wwwroot/example.com 替换为你自己的网站目录）
cd /www/wwwroot/example.com
php -r "copy('.env.example', '.env');"
```

如果你是使用面板，请进入网站根目录后右键 “**.env.example**” 文件，点选 “**重命名**” 选项卡，命名为 `.env` 就完成了。

------

修改文件的话，命令行需要使用 `vi` 或 `vim` 等，编辑文件。比如下面这样：

``` sh
# 进入你的网站目录（需要将 /www/wwwroot/example.com 替换为你自己的网站目录）
cd /www/wwwroot/example.com

# 如果你想使用 vim 但没有安装 vim
yum install vim

# 使用 vim 编辑文件
vim .env

# 使用 vi 编辑文件
vi .env
```

如果你不会使用 vim 那么再输入完上面的命令行后，点击键盘上的 `i` 键进入编辑模式，然后操控键盘的上下左右来移动光标到指定要修改的位置。修改完记得一定要保存再退出！就是你修改完后按下 `ESC` 键后没有任何提示，按照下面的内容输入对应的行为，再最底部可以看见输入，输入完成后按回车保存。

| 命令 | 说明 |
| :---- | :---: |
| `:w` | 保存文件但不退出vi |
| `:w file` | 将修改另外保存到file中，不退出vi |
| `:w!` | 强制保存，不推出vi |
| `:wq` | 保存文件并退出vi |
| `:wq!` | 强制保存文件，并退出vi |
| `:q` | 不保存文件，退出vi |
| `:q!` | 不保存文件，强制退出vi |
| `:e!` | 放弃所有修改，从上次保存文件开始再编辑命令历史 |

你也可以在宝塔面板的网站根目录中，打开并编辑 “**.env**” 文件，通过下面的说明。

 - `DB_HOST`：MySQL 数据库的地址，默认本机为 `127.0.0.1` 无需修改
 - `DB_PORT`：MySQL 数据库的端口，默认为 `3306` 无需修改
 - `DB_DATABASE`：MySQL 数据库的名，当时创建网站时的名，你也可以在面板【数据库】选项卡中查看
 - `DB_USERNAME`：MySQL 数据库的用户名，当时创建网站时的名，你也可以在面板【数据库】选项卡中查看，也可为 `root`
 - `DB_PASSWORD`：MySQL 数据库的密码，若用户名为 root 那么密码则是 root 的密码

数据库名和数据库的用户名一定要区分开！宝塔创建网站的时候只给了一个输入框但是是两个一样的值，这会误导大家！这其实是两个东西，只是在宝塔创建的时候一致！切勿被误导！不建议使用 root 用户，因为那样会访问到所有的数据库，为了安全性不建议这样做！root 账户的密码可以在 **左侧导航栏【数据库】->数据库列表上方【root密码】按钮**。

改完的文件，类似下面这样：

``` env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=card_shop_1
DB_USERNAME=prk_website
DB_PASSWORD=abcd1234


# 下面配置无需修改
APP_ENV=local
APP_KEY=
APP_DEBUG=false
APP_LOG_LEVEL=error
APP_LOG=daily

BROADCAST_DRIVER=log
CACHE_DRIVER=file
SESSION_DRIVER=array
SESSION_LIFETIME=120
QUEUE_DRIVER=sync

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379
```

------

构建数据库，必须使用命令行了哦~

``` sh
# 进入你的网站目录（需要将 /www/wwwroot/example.com 替换为你自己的网站目录）
cd /www/wwwroot/example.com

php artisan key:generate
php artisan migrate:fresh --seed
php artisan cache:clear
```

**提示：若这一步出现红色错误内容: 'XXX' has been disabled, 是由于宝塔自动禁用了很多函数，就像上面提到的，请到 PHP 设置里面删除禁用相应函数即可。**


### 4) 配置网站

在网站列表中，点击对应网站右侧【**设置**】按钮，依次设置下列内容。

 - 网站目录  
    1. 关闭掉 “**防跨站工具(open_basedir)**” 开关  
    2. 将运行目录下拉修改为 `/public` 并点击保存即可  
    <!-- 404 Not Found -->
 - 伪静态（Nginx 需配置，Apache 无需配置）  
    将一下内容复制进去后并点击【**保存**】按钮。
    ``` conf
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }
    ```
    ![](/assets/images/20230130011440.png)


### 5) 完成与善后

最好重启一下 PHP 和 Nginx，然后访问网站，看一下是否正常访问。

下面的例子是将 `example.com` 假设为你的网站域名：
 - 网站首页：`http://example.com/`
 - 网站后台：`http://example.com/admin`

默认的账号：`admin@qq.com`  
默认的密码：`123456`

建议登录后的第一件事就是修改登录密码！

进入网站后台【**管理中心**】-【**网站设置**】-【**常规**】中，将 “**网站地址**” 和 “**网站API地址**” 修改为你的网站地址。**网站 API 地址**最好是没有 CDN 盾等有访问限制的地址。

网站后台【**管理中心**】-【**支付渠道**】配置支付信息。

即可开始使用。
