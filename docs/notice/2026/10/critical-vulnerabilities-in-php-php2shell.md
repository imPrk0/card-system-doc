# PHP 严重漏洞 PHP2Shell 修复通知 <Badge type="danger" text="紧急" /> {#title}

::: danger 注意

该影响与危害的严重等级是最高的，只要你的网站能够被访问，就存在该漏洞且有被恶意利用的风险！如果你在受影响的版本请务必升级，绝对不能疏忽大意！

:::

2026 年 10 月 17-20 日，PHP 语言的漏洞 “**CVE-2026-109618**”、“**CVE-2026-109619**” 被披露，当 PHP 在处理请求时，如果因为内存耗尽 OOM 时，会导致内存没有被正确清理，从而导致攻击者可以利用次特性，向服务器发送恶意请求，使得 PHP 缓存了脏数据，最后再利用脏数据执行 RCE 远程执行代码漏洞。

- [Security advisory: Critical remote code execution vulnerabilities, update now](https://www.php.net/archive/2026.php#2026-10-21-5)<br />21 Oct 2026 - [PHP](https://www.php.net)


## 判断是否受影响 {#check}

请根据如下步骤，判断您是否收到影响：


### PHP 版本检查 {#check-php-version}

::: info 提示

请检查您网站所使用的 PHP 版本是否在受影响版本范围内，如果在首个安全版本则为安全，无需处理。

:::

- **PHP 8.6 及更新版本**<br />
  你大可不必担心！截止漏洞发生时，PHP 8.6 尚未发布。如果你看到这里的时候是在 PHP 8.6 版本及之后，那么可以不必担心。

- **PHP 8.2 ~ 8.5 当前受 PHP EOL 官方支持的生命周期版本**
  | 分支 | 受影响版本 ≦ | 首个安全版本 ≧ |
  | :---: | :--- | :--- |
  | PHP 8.5 | ≦ 8.5.11 | ≧ 8.5.12 |
  | PHP 8.4 | ≦ 8.4.26 | ≧ 8.4.27 |
  | PHP 8.3 | ≦ 8.3.35 | ≧ 8.3.36 |
  | PHP 8.2 | ≦ 8.2.34 | ≧ 8.2.35 |

- **PHP 8.1 及更早版本**<br />
  PHP 8.1 及更早版本已经 EOL 生命周期结束，如果不安装修复补丁则一定存在该漏洞！官方不再提供安全更新，建议尽快升级到 PHP 8.2 或更高版本，或是安装补丁。


## 修复方法 {#fix}

有两个修复方案，分别是 “[更新程序与 PHP 版本](#fix-update)” (推荐) 与 “[安装补丁](#fix-patch)”，除非你当前的程序经过二次开发修改且难以直接升级至新版本 (需要与你的技术人员沟通以评估方案)，否则请直接升级 PHP 版本。


### 更新程序与 PHP 版本 <Badge type="tip" text="推荐" /> {#fix-update}

程序更新到了 [3.20](/changelog/v3.html#3-20)，你需要暂时关闭网站，下载合适版本的 PHP 进行升级，升级完成后再切换 PHP CLI 版本，最后再重新启动网站即可。


### 安装补丁 {#fix-patch}

这是最不推荐的做法，PHP 官方已经停止了 PHP 8.1 及更早版本的维护与升级，包括这次高危漏洞的修复补丁也不会再提供给 PHP 8.1 及更早版本，如果想要在早期版本修复，需要寻求社区的帮助与支持，或者自行编译 PHP 源码安装补丁。

为了方便找寻后续的补丁与维护方案，此处放出 “[由宝塔面板官方提供的 PHP 安全修复版本 Linux 版](https://docs.bt.cn/notices/php-security-protection-guide/)”，如果使用宝塔面板可以直接更新 PHP。

| 分支 | 修复版本 | 宝塔 Linux 面板可以更新 | 下载源码包 |
| :---: | :---: | :---: | :---: |
| PHP 7.4 | 7.4.34 | - | [源码包下载地址](https://download.bt.cn/src/php-7.4.34.tar.gz) |
| PHP 7.3 | 7.3.34 | ✅ | [源码包下载地址](https://download.bt.cn/src/php-7.3.34.tar.gz) |
| PHP 7.2 | 7.2.35 | ✅ | [源码包下载地址](https://download.bt.cn/src/php-7.2.35.tar.gz) |

> 有关于自行通过 PHP 官方 Backports 的编译与修复的方式，请参考 “[PHP2Shell Fix for PHP 8.1, 8.0 and 7.4 | ComputingForGeeks](https://computingforgeeks.com/php2shell-end-of-life-php-backport/)”。<br />
> 此处因对于复杂度与拥有开发能力者的情况综合评估暂不提供，懂得 C 语言与编译的用户不需要过多赘述就懂得如何解决，因为复杂度，不会的人可能会遇到种种问题，建议如果是这种情况还是优先考虑 “[更新程序与 PHP 版本](#fix-update)” 或寻求大语言模型 LLM 的帮助。

---

**免责提示: 对于此次漏洞所造成的一切损失，[开源项目](https://github.com/Tai7sy/card-system)的所有者与协作者没有理由承担任何包括法律与道德在内的一切责任。**
