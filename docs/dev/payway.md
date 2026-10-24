# 支付驱动开发文档 {#title}

TODO ...

> 仓库: [card-gateway](https://github.com/Tai7sy/card-gateway)

> 如果您需要添加自定义支付渠道，可以参考此教程进行接入。

## 名词解释: 
**`支付驱动`**: 支付接口的名称, 如 Alipay/Aliwap/WeChat/QPay

**`支付方式`**: 支付接口内的具体支付方式, 如 WeChat 内的 NATIVE/H5 等

## 接入流程
1. 程序所有支付SDK位于`app/Library/Gateway/Pay`目录下，如: 我们接入有赞支付，新建文件夹名为 `Youzan`, 文件夹名称即`支付驱动`名称

2. 在第一步新建的文件夹中新建文件名为 `Api.php`
```
<?php

namespace Gateway\Pay\Youzan;

use Gateway\Pay\ApiInterface;

class Api implements ApiInterface
{
    private $url_notify = '';
    private $url_return = '';

    public function __construct($id)
    {
        $this->url_notify = SYS_URL_API . '/pay/notify/' . $id;
        $this->url_return = SYS_URL . '/pay/return/' . $id;
    }


    /**
     * @param array $config 配置信息
     * @param string $out_trade_no 发卡系统订单号
     * @param string $subject 商品名称
     * @param string $body 商品介绍
     * @param int $amount_cent 支付金额, 单位:分
     * @throws \Exception
     */
    function goPay($config, $out_trade_no, $subject, $body, $amount_cent)
    {
        $payway = strtolower($config['payway']);
        // wechat qq alipay
        // 跳转支付页面
        header('Location: http://example.com/order?out_trade_no=' . $out_trade_no . '&subject=' . $subject . '&total_fee=' . $amount_cent);
        exit;
    }

    /**
     * @param $config
     * @param callable $successCallback
     * @return bool|string
     * @throws \Exception
     */
    function verify($config, $successCallback)
    {
        $isNotify = isset($config['isNotify']) && $config['isNotify'];

        // 如果是异步通知
        if ($isNotify) {
            // 这里是支付后一步回调步骤
            // 在这里需要做一些校验(如签名校验等), 确保通知的合法性
            if (verify_notify()) {
                echo 'success';
                $order_no = $_REQUEST[''];  // 发卡系统内交易单号
                $total_fee = $_REQUEST['']; // 实际支付金额, 单位, 分
                $pay_trade_no = $_REQUEST['']; // 支付系统内订单号/流水号
                $successCallback($order_no, $total_fee, $pay_trade_no); // 成功后记得调用此函数处理订单
                return true;
            } else {
                \Log::error('这里可以记录一些出错信息, 内容保存在 /storage/logs 内');
                echo 'error';
                return false;
            }
        }


        // 这里传递了发卡系统内交易单号, 有两种可能来到此步骤
        // 1. 用户提交订单后未支付, 重新发起支付, 支付前需要校验是否已经支付
        // 2. 此支付方式支持二维码扫码等方式, 二维码页面轮训请求是否支付
        if (!empty($config['out_trade_no'])) {
            // 通过主动查询方式查询交易是否成功
            $order = query_order($config['out_trade_no']);
            if ($order['status'] === 'SUCCESS') {
                $order_no = $order[''];  // 发卡系统内交易单号
                $total_fee = $order['']; // 实际支付金额, 单位, 分
                $pay_trade_no = $order['']; // 支付系统内订单号/流水号
                $successCallback($order_no, $total_fee, $pay_trade_no); // 成功后记得调用此函数处理订单
                return true;
            } else {
                \Log::error('这里可以记录一些出错信息, 内容保存在 /storage/logs 内');
                return false;
            }
        }

        // 这里是支付后返回的页面调用的步骤, 一般返回页面也会带有支付后的参数
        // 因此如果做了校验(如签名校验等), 一样可以认为我们支付成功了
        if (verify_return()) {
            $order_no = $_REQUEST[''];  // 发卡系统内交易单号
            $total_fee = $_REQUEST['']; // 实际支付金额, 单位, 分
            $pay_trade_no = $_REQUEST['']; // 支付系统内订单号/流水号
            $successCallback($order_no, $total_fee, $pay_trade_no); // 成功后记得调用此函数处理订单
            return true;
        } else {
            \Log::error('这里可以记录一些出错信息, 内容保存在 /storage/logs 内');
            return false;
        }
    }
}
```
