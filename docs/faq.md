# 常见问题 {#title}

为了更加高效的处理用户的问题，请在提问前务必看完常见问题！因为目前收到的 Issues 中大多数都是以下问题：

有一些问题（比如重置管理员邮箱在插件中）：[插件](https://github.com/Tai7sy/card-system/wiki/%E3%80%90%E6%8F%92%E4%BB%B6%E3%80%91%E4%B8%80%E4%BA%9B%E6%8F%92%E4%BB%B6%EF%BC%8C%E5%8F%AF%E4%BB%A5%E8%BE%85%E5%8A%A9%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%BA%9B%E5%8A%9F%E8%83%BD)

  - 修改 **`.env` 文件** / **网站配置**无效 或 **迁移网站或目录或数据库** 出错

    可以使用如下代码解决问题：

    ``` sh
    # 进入你的网站目录
    cd /www/wwwroot/example.com
    
    # 清各种缓存
    php artisan cache:clear
    php artisan config:clear
    php artisan route:clear
    ```

    如果你使用如上命令后 `.env` 文件无效，请使用如下命令手动构建环境变量缓存：

    ``` sh
    # 进入你的网站目录
    cd /www/wwwroot/example.com
    
    # 手动构建缓存
    php artisan config:cache
    ```


  - 后台密码忘记重置

    > php artisan reset:password _[Email]_ _[Password]_

    默认后台登录邮箱 `admin@qq.com`  
    默认后台登录密码 `123456`  
    请将下面的命令中对应的邮箱和密码替换为自己要修改的，或是直接执行下面的命令。  
    _（如果你已经修改过登录的邮箱，请替换 `admin@qq.com` 为自己设置的邮箱。如果也忘记就去数据库找）_

    ``` sh
    # 进入你的网站目录
    cd /www/wwwroot/example.com
    
    # 修改密码
    php artisan reset:password admin@qq.com 123456
    ```


  - 提示 **未知错误** 或 **500错误** 的解决办法

    因为在页面上直接抛出错误会包含敏感信息，所以不对外展示。需要到如下目录查看你的错误。

    _（假设 `/www/wwwroot/example.com` 为网站所在目录）_

    > /www/wwwroot/example.com/storage/logs

    如果你的网站是刚开的，那么默认的文件不会有很多。有能力的自行排错，或者根据本页面的提示排错。若按照提示排错依旧不行请发 [Issues](https://github.com/Tai7sy/card-system/issues)。

    一般格式为：`card_cli-年-月-日.log` 和 `card_fpm-fcgi-年-月-日.log` 两种。文件过多请直接搜索格式为 `YYYY-mm-dd`（如：2020-01-01）的文件，并找出格式一致的文件进行排错或提问。


  - 因 Geetest 验证码过期等原因无法加载验证码无法登录网站后台

    是否开启验证码是在后台数据库当中 `systems` 表的 `vcode_login` 字段控制的。将该字段改为 `0` 即可。  
    或是直接使用下面的 SQL 语句。

    ``` sql
    UPDATE `systems` SET `value` = '0' WHERE `systems`.`name` = 'vcode_login';
    ```

    修改完成后多半不生效，是缓存的问题。请参阅本文顶端 “修改 **`.env` 文件** / **网站配置**无效” 部分。


  - 网站 “**普通验证码**” 无法使用，请求提示 `500` 错误

    如果是宝塔，请在面板中找到左侧导航【**软件商店**】->上方【**已安装**】->找到你的 PHP 对应版本的右侧【**设置**】->【**安装扩展**】中安装 `fileinfo` 扩展。

    不使用宝塔请：
      - [Google](https://www.google.com/search?q=PHP+%E5%AE%89%E8%A3%85+fileinfo)
      - [Bing](https://www.bing.com/search?q=PHP+%E5%AE%89%E8%A3%85+fileinfo)
      - [Bing中国](https://cn.bing.com/search?q=PHP+%E5%AE%89%E8%A3%85+fileinfo)


  - 网站升级后支付页面提示 **发生错误，下单失败，请稍后重试**

    该问题为新版本更新了 “**订单查询密码**” 功能，但因数据库没有及时更新，所以出现了错误。  
    _（👇 如下图所示）_

    ![20230130233002](https://user-images.githubusercontent.com/71644464/215520662-f3abb8dd-d636-4e90-a2c8-eb0ddc4aa24b.png)

    请使用如下命令手动更新数据库：

    ``` sh
    # 进入你的网站目录
    cd /www/wwwroot/example.com
    
    php artisan migrate
    ```


  - 网站图标部分变成英文字母

    这其实是图标在没加载出来的情况下会使用英文字母代替。相关文件都在网站中，请确定网站源码完整并来到**开发人员选项**中查看网络请求是否有错误。

    少数情况是浏览器不支持，这种情况建议尝试更换 Chromium 内核的浏览器等现代化浏览器重试。

    最有可能还是网站加载速度过慢，很多人都是用小水管服务器，难免会出现这种情况。通常等待一段时间就可以正常加载。

    ![20230130233342](https://user-images.githubusercontent.com/71644464/215521532-b7f88430-e166-4944-93c5-baba105db04b.png)

    电脑浏览器进入网页，【右键】->【检查】（或 “审查元素”）->【模拟设备】->->->->->->->

    ![image](https://user-images.githubusercontent.com/71644464/216380259-25c66595-c375-4628-8527-6151b949aabb.png)

    .


  - 修改登录后台的邮箱

    你可以在数据库中 `users` 表中，`id = 1` 的用户的 `email` 字段，将其修改成想要的邮箱，或是使用下面的 SQL 命令。  
    _（你只需要替换 `admin@gmail.com` 为自己想要的邮箱即可，切记注意不要删掉两侧引号）_

    ``` sql
    UPDATE `users` SET `email` = 'admin@gmail.com' WHERE `users`.`id` = 1;
    ```


  - 支付接口对接抛出异常

    支付接口网关仓库：[card-gateway](https://github.com/Tai7sy/card-gateway)/[Pay](https://github.com/Tai7sy/card-gateway/tree/master/Pay)

    如果你在支付的时候遇到了如 “**签名错误**”、“**获取支付地址失败**”、“**超时**” 等错误，一般为自己的问题。可能是填写错误，或是支付接口审核中或未通过。支付接口一般在上线前都会进行测试，即便是遇到 BUG 或是支付接口更新都会及时更新。通常不会存在接口网关故障的情况。请自己检查或是 Google 搜索对应的支付接口都有什么值或是预览上方仓库的列表中找到对应文档进行查看使用教程。

    ![](https://user-images.githubusercontent.com/45266046/212805005-00f5bee9-10b9-4f91-920b-774cb42427ee.png)


  - 配置易支付接口

    TODO


  - 网站添加 5 秒盾

    很多人看到有些人的网站会等待 5 秒才能进入网站，这个就是 5 秒盾。通常是 CDN 完成的，宝塔面板的收费插件 “**Nginx 防火墙**” 的防御 CC 攻击功能也同样有该功能。请使用 CDN 来实现（如：Cloudflare）。


  - 支付宝 `Business Failed: ACCESS_FORBIDDEN`

    商家没有当面付（或其它支付方式）能力，请到 [支付宝开放平台](https://open.alipay.com/) 添加能力到应用。


  - 支付宝 ``

    提示类似如下：

    ```
    error:0D0680A8:asn1 encoding routines:ASN1_CHECK_TLEN:wrong tag (-----BEGIN PUBLIC KEY----- -----BEGIN CERTIFICATE-----
    ABCDEFGHIJKLMNOPQRSTUVWXYZ 1234567890
    XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    -----END CERTIFICATE----- -----END PUBLIC KEY-----)
    ```

    2022 年临近年末，支付宝开放平台升级，目前应用支持 “**密钥**” 和 “**证书**” 两种，你需要选择 “**密钥**”，而不是 “**证书**”！


  - **定时清理未支付订单** 提示 `no scheduled commands are ready to run.` 问题

    其实这并不是问题。如果你的报错提示下面的内容，那么这个是正常的。

    ``` text
    no scheduled commands are ready to run.
    ```

    ![image](https://user-images.githubusercontent.com/71644464/220517716-8952f6c3-337b-4c2d-a1ca-8126824fc469.png)

    你只要保证设置好了一分钟执行一次，那么就不要管这里的提示了。因为 PHP 作为脚本语言是被访问的时候才会流程执行一次，它并不像 Go 语言编译成二进制程序常驻后台自动化的执行，它只能够被访问的时候才会执行（这也就是在高并发的情况下 Go 语言的性能比 PHP 更加出色的原因），这也就导致了你需要设置定时任务以保证 PHP 程序被执行。
