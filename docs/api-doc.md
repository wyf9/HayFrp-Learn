# HayFrp OPENAPI使用文档

> 注意：在调用HayFrp OPENAPI时，请您务必加上标头Headers："waf: off"以绕过雷池防火墙.
>
> API地址：https://api.hayfrp.com
> 
> 警告：禁止使用HayFrp OPENAPI进行任何违法操作，包括但不限于：非法获取他人CSRF并接管账号权限、非法调用OPENAPI进行邮箱发件等
>
> 在您使用HayFrp OPENAPI时，请务必标注HayFrp OPENAPI或其他字样，禁止标注对HayFrp OPENAPI不利字样。
>
> 使用HayFrp OPENAPI即代表您已同意协议。

# First - 用户账号API

> */user*
>
> `application/json;charset=UTF-8`
>
> `POST`

## 1.LoginAPI - 登录API
> 本API用于登录并获取Token.

请求示例：
```jsonc
{
    "type":"login", // 指定操作类型为登录
    "user":"HayTEST114514", // 用户名或邮箱
    "passwd":"114514pwd" // 密码
}
```
返回示例：

```jsonc
{
    "status":000, // 登录状态码，成功登录为200，密码错误为403，用户不存在、未指定操作、缺失参数为404
    "message":"xxx", // 提升信息
    "token":"xxx" // 返回的token，登录成功后返回，登录失败返回null
}
```


可能返回内容：

> 数据缺失
```jsonc
{
    "status": 404,
    "message": "XXX不能为空."
}
```

> 未指定操作(type值未设置)
```jsonc
{
    "status": 404,
    "message": "无用户类型."
}
```

> 密码错误
```jsonc
{
    "status": 403,
    "message": "登录失败，您的密码有误.",
    "token": null
}
```

> 用户不存在
```jsonc
{
    "status": 404,
    "message": "用户还没有注册.",
    "token": null
}
```

> 登录成功
```jsonc
{
    "status": 200,
    "message": "登录成功，欢迎使用HayFrp！",
    "token": "xxxxxxxxxxx"
}
```
> ``注意，从HayFrp Console 3.0开始，返回的Token（Csrf）永远是临时的，仅可使用7天，在下一次登录后上次登录时返回的Token也会失效。``

## 2.CsrfAPI - 验证Token（Csrf）是否仍然有效
> 本API用于检测Csrf是否仍然有效


请求示例：
```jsonc
{
    "type":"csrf", // 指定操作类型为验证Token（Csrf）
    "csrf":"xxxxxxxxxxx" // 上次登录时返回的Token
}
```
返回示例：

```jsonc
{
    "status": 000, // 检查Token（csrf）状态码，仍然有效为200，无效为403，未指定操作、缺失参数为404
    "message": "xxx", // 检查提示信息
    "token": "xxx" // 返回的Token，无效为null，有效为上次登录时返回的Token
}
```

可能返回内容：

> 数据缺失
```jsonc
{
    "status": 404,
    "message": "XXX不能为空."
}
```

> 未指定操作(type值未设置)
```jsonc
{
    "status": 404,
    "message": "无用户类型."
}
```

> Token（csrf）无效
```jsonc
{
    "status": 403,
    "message": "登录无效或已过期.",
    "token": null
}
```

> Token（csrf）有效
```jsonc
{
    "status": 200,
    "message": "登录成功，欢迎使用HayFrp！",
    "token": "1145141919810"
}
```
## 3.RegisterSendEmailAPI - 注册（发送邮件验证码）API
> 本API用于发送注册验证码到指定邮箱，以验证邮箱是否可用且验证邮箱是否属于用户。

> ``禁止将RegSendEmailAPI用户邮件轰炸等用途``

请求示例：
```jsonc
{
    "type": "sendregcode", // 指定操作类型为发送邮箱验证码
    "user": "HayTEST", // 用户名
    "device": "HayTEST", // 设备名称，可以是用户名+邮箱
    "email": "official@hxit.top" // 邮箱地址
}
```
返回示例：

```jsonc
{
    "status": 000, // 发送状态码，成功发送为200，邮箱服务器错误、邮箱格式错误为500，未指定操作、缺失参数为404，频繁操作为403
    "message": "xxx", // 发送提示信息
}
```

可能返回内容：

> 数据缺失
```jsonc
{
    "status": 404,
    "message": "XXX不能为空."
}
```

> 未指定操作(type值未设置)
```jsonc
{
    "status": 404,
    "message": "无用户类型."
}
```
> 频繁操作
```jsonc
{
    "status": 403,
    "message": "请求过于频繁，请稍后重试."
}
```
> 邮箱服务器异常、格式错误
```jsonc
{
    "status": 500,
    "message": "服务器异常，请稍后重试."
}
```
> 发送成功
```jsonc
{
    "status": 200,
    "message": "系统已将验证码发送到您的账户，请查收."
}
```
## 4.RegisterAPI - 注册API
> 本API用于注册新用户，请确保邮箱验证码正确且邮箱可用。

请求示例：
```jsonc
{
    "type": "register", // 指定操作类型为注册
    "user": "HayTEST", // 用户名
    "device": "HayTEST", // 设备名称，可以是用户名+邮箱
    "email": "official@hxit.top", // 邮箱地址
    "passwd": "114514pwd", // 密码
    "regcode": "114514" // 邮箱验证码
}
```
返回示例：

```jsonc
{
    "status": 000, // 注册状态码，404为未指定操作、缺失参数、邮箱验证码错误，500为服务器异常，403为用户名已存在，200为注册成功
    "message": "xxx" // 注册提示信息
}
```
可能返回内容：

> 数据缺失
```jsonc
{
    "status": 404,
    "message": "XXX不能为空."
}
```

> 未指定操作(type值未设置)
```jsonc
{
    "status": 404,
    "message": "无用户类型."
}
```
> 用户名已存在
```jsonc
{
    "status": 403,
    "message": "用户名已存在."
}
```
> 邮箱验证码错误
```jsonc
{
    "status": 404,
    "message": "验证码有误或者原用户名/邮箱在发送验证码后已更改，请重新发送."
}
```
> 服务器异常
```jsonc
{
    "status": 500,
    "message": "服务器异常，请稍后重试."
}
```
> 注册成功
```jsonc
{
    "status": 200,
    "message": "注册成功，欢迎使用HayFrp."
}
```

## 5.GetInfoAPI - 用户信息获取API
> 本API用于获取用户信息，请确保Token（csrf）有效。

请求示例：
```jsonc
{
    "type": "info", // 指定操作类型为获取用户信息
    "csrf": "1145141919810" // 登陆时返回的Token（csrf）值
}
```

返回示例：

```jsonc
{
    "status": "bool值", // 账号状态（true为未封禁，false为封禁）
    "message": "xxx", // 提示信息
    "id": "000", // 账号ID
    "username": "xxx", // 用户名
    "token": "xxx", // 账号Frp链接Token（可更新）
    "email": "official@hxit.top", // 账号邮箱
    "traffic": "0000", // 剩余流量，单位MB
    "realname": "bool值", // 是否已实名认证
    "proxies": "00",// 拥有隧道数
    "useproxies": "00",// 已使用隧道数
    "regtime": "000000000",// 注册时间（时间戳）
    "signdate": "",// 上次签到时间（时间戳）（没签到过则是null）
    "totalsign": null,//总共签到天数
    "totaltraffic": null, // 总共签到流量（单位GB）
    "todaytraffic": 0, // 今日使用流量（单位Bytes）
    "qid": null, // 头像使用QQ号
    "sprovider": "true/false", // 是否为服务商账户
    "uuid": "EFD2410E-223B-4879-9161-1179EBAD1C85" // 唯一用户标识符，该标识符无法修改
}
```
可能返回内容：

> 数据缺失
```jsonc
{
    "status": 404,
    "message": "XXX不能为空."
}
```

> Token（csrf）无效或过期
```jsonc
{
    "status": 403,
    "message": "登录无效或已过期.",
    "token": null
}
```
> 服务器异常
```jsonc
{
    "status": 500,
    "message": "服务器异常，请稍后重试.",
    "token": null
}
```
> 获取数据成功
```jsonc
{
    "status": true,
    "message": "CSRF 仍然在有效范围内，成功获取用户数据.",
    "id": "114514",
    "username": "xxx",
    "token": "xxxxxxxxxx",
    "email": "official@hxit.top",
    "traffic": "114514",
    "realname": "true/false",
    "proxies": "114514",
    "useproxies": 1919810,
    "regtime": "114514",
    "signdate": "114514",
    "totalsign": "114514",
    "totaltraffic": "114514",
    "todaytraffic": "114514",
    "qid": "114514",
    "sprovider": "false/true",
    "uuid": "114514-1919-8100-HHHH-HAHAHAHAHA"
}
```


## 6.SignAPI - 签到API


请求示例：
```jsonc
{
    "type": "sign", // 指定操作类型为签到
    "csrf": "1145141919810" // 登陆时返回的Token（csrf）值
}
```
返回示例：

```jsonc
{
    "status": 000, // 签到状态码，404为未指定操作、缺失参数、CSRF过期或无效，500为服务器异常，200为签到成功
    "message": "xxx", // 签到提示信息
    "signflow": xxx, // 今天签到的流量值
    "flow": xxx // 剩余的流量值，单位为GB
}
```
可能返回内容：

> 数据缺失
```jsonc
{
    "status": 404,
    "message": "XXX不能为空."
}
```

> 未指定操作(type值未设置)
```jsonc
{
    "status": 404,
    "message": "无用户类型."
}
```
> 服务器异常
```jsonc
{
    "status": 500,
    "message": "服务器异常，请稍后重试.",
    "flow": null
}
```
> Token（Csrf）过期
```jsonc
{
    "status": 404,
    "message": "CSRF临时授权无效或已过期.",
    "flow": null
}
```
> 签到成功
```jsonc
{
    "status": 200,
    "message": "🎉签到成功，您今天获得了114514GB的流量，您目前还剩114514GB流量.",
    "signflow": 114514,
    "flow": 1145141919810
}
```

## 7.ReTokenAPI - 更新用户Token

> 该API用于重置Frp链接Token、用户登录Token（csrf）

请求示例：
```jsonc
{
    "type": "retoken", // 指定操作类型为隧道
    "csrf": "1145141919810", // 登陆时返回的Token（csrf）值
}
```
返回示例：

```jsonc
{
    "status": 000, // 状态码，403为Token（csrf）无效或过期，500为服务器异常、200为重置成功
    "message": "xxx", // 提示信息
    "token": "xxx" // 如果成功则返回更新后的Frp链接Token，失败则返回null
}
```

可能返回内容：

> 数据缺失
```jsonc
{
    "status": 404,
    "message": "XXX不能为空."
}
```

> 服务器异常
```jsonc
{
    "status": 500,
    "message": "服务器异常，请稍后重试.",
    "token": null
}
```
> Token（csrf）过期
```jsonc
{
    "status": 403,
    "message": "登录无效或已过期.",
    "token": null
}
```
> 重置成功
```jsonc
{
    "status": 200,
    "message": "重置成功，您的Token为已被重置为xxxxxxxxxx.",
    "token": "xxxxxxxxxx"
}
```

## 8.ResetPasswdSendCodeAPI - 重置密码（发送验证码）

> 本API用于重置密码前发送验证码以确定账户是用户的

请求示例：
```jsonc
{
    "type": "findpassem", // 指定操作类型为发送验证码
    "user": "xxx" // 用户名或邮箱
}
```
返回示例：

```jsonc
{
    "status": 000, // 状态码，404为未指定操作、缺失参数、用户名或邮箱不存在，500为服务器异常，200为发送成功
    "message": "xxx" // 提示信息
}
```
可能返回内容：

> 数据缺失
```jsonc
{
    "status": 404,
    "message": "电子邮件或用户名不能为空."
}
```

> 服务器异常
```jsonc
{
    "status": 500,
    "message": "服务器异常，请稍后重试."
}
```
> 用户名或邮箱不存在
```jsonc
{
    "status": 404,
    "message": "未找到账户，请检查您的用户名或邮箱."
}
```
> 发送成功
```jsonc
{
    "status": 200,
    "message": "我们已经尝试了发送一封邮件到该账号的邮箱，请查收。"
}
```

## 9.ResetPasswdAPI - 重置密码

> 本API用于重置密码

请求示例：
```jsonc
{
    "type":"findpassct", // 指定操作类型为重置密码
    "token":"xxx", // 通过邮箱发送给用户的临时Token
    "newpass":"xxx", // 新密码
}
```
返回示例：

```jsonc
{
    "status": 000, // 状态码，404为未指定操作、缺失参数，500为Token无效或过期、服务器异常，200为重置成功
    "message": "xxx" // 提示信息
}
```
可能返回内容：

> 数据缺失
```jsonc
{
    "status": 404,
    "message": "XXX不能为空."
}
```
> 服务器异常
```jsonc
{
    "status": 500,
    "message": "服务器异常，请稍后重试."
}
```
> Token无效或过期
```jsonc
{
    "status": 500,
    "message": "密码重置失败，请检查您的Token后重试."
}
```
> 重置成功
```jsonc
{
    "status": 200,
    "message": "密码重置成功，您的密码已被更改为xxx."
}
```

## 10. RedemptionAPI - 激活码兑换API

> 本API用于兑换激活码为账号资产

请求示例:

```jsonc
{
    "type": "redemption", // 指定操作类型为激活码兑换
    "active": "exchange",
    "csrf": "1145141919810", // 登陆时返回的Token（csrf）值
    "code": "AAAAA-BBBBB-CCCCC-DDDDD-EEEEE" // 激活码
}
```

返回示例:

> 兑换成功

```jsonc
{
    "status": 200,
    "message": "账号 XXX 使用 #XXX 兑换码兑换 XXX 成功！"
}
```

> 兑换失败

```jsonc
{
    "status": 404,
    "message": "兑换码无效或已过期."
}
```

> 数据缺失

```jsonc
{
    "status": 404,
    "message": "兑换码不能为空."
}
```

> 服务器异常

```jsonc
{
    "status": 500,
    "message": "服务器异常，请稍后重试."
}
```

> Token无效或过期

```jsonc
{
    "status": 404,
    "message": "CSRF临时授权无效或已过期.",
    "flow": null
}
```

# Second - 隧道

> */proxy*
>
> `application/json;charset=UTF-8`
>
> `POST`

## 1.AddTunnelAPI - 添加隧道API

> 该API用于创建隧道

请求示例：
```jsonc
{
    "type": "add", // 指定操作类型为创建隧道
    "csrf": "1145141919810", // 登陆时返回的Token（csrf）值
    "proxy_name": "xxxxx", // 隧道名称（应该在3-15内）
    "proxy_type": "xxx", // 隧道类型，可选：tcp/udp/http/https/xtcp/stcp
    "local_ip": "127.0.0.1", // 本地IP，默认为“127.0.0.1”
    "local_port": 1145, // 本地端口，范围应该在1-65500内
    "remote_port": 1145, // 远程端口，范围应该在1-65500内，HTTP(S)、S/X TCP（P2P连接）可不填写
    "use_encryption": "true/false", // bool值，传入应非bool类型，否则API会炸，是否开启加密
    "use_compression": "true/false", // bool值，传入应非bool类型，否则API会炸，是否开启压缩
    "sk": "xxx", // 连接密钥，一般在S/X TCP（P2P）连接才需要填写
    "node": "", // 节点ID，为数字
    "domain": "", // 非必须，在HTTP(S)域名才需要
    "locations": "", // （高级选项）非必须，仅有需要填写，维护可能不经常，会出现奇奇怪怪的Bug
    "header_X_From_Where": "", // （高级选项）非必须，仅有需要填写，维护可能不经常，会出现奇奇怪怪的Bug
    "host_header_rewrite": "" // （高级选项）非必须，仅有需要填写，维护可能不经常，会出现奇奇怪怪的Bug
}
```
返回示例：

```jsonc
{
    "status": 000, // 状态码，403为Token（csrf）无效或过期，404为数据缺失，500为服务器异常，200为创建成功
    "message": "xxx",
    "id":"000" // 隧道ID，只在创建成功后会显示
}
```
可能返回内容：

> 数据缺失
```jsonc
{
    "status": 404,
    "message": "XXX不能为空."
}

```
> 服务器异常
```jsonc
{
    "status": 500,
    "message": "服务器异常，请稍后重试."
}
```
> Token（csrf）过期
```jsonc
{
    "status": 403,
    "message": "登录无效或已过期."
}
```
> 创建成功
```jsonc
{
    "status": 200,
    "message": "隧道创建成功.",
    "id": "000"
}
```
## 2.EditTunnelAPI - 更改隧道API

> 该API用于更改隧道

请求示例：
```jsonc
{
    "type": "edit", // 指定操作类型为编辑隧道
    "csrf": "1145141919810", // 登陆时返回的Token（csrf）值
    "id": "000", // 隧道ID
    "proxy_name": "xxxxx", // 隧道名称（应该在3-15内）
    "proxy_type": "xxx", // 隧道类型，可选：tcp/udp/http/https/xtcp/stcp
    "local_ip": "127.0.0.1", // 本地IP，默认为“127.0.0.1”
    "local_port": 1145, // 本地端口，范围应该在1-65500内
    "remote_port": 1145, // 远程端口，范围应该在1-65500内，HTTP(S)、S/X TCP（P2P连接）可不填写
    "use_encryption": "true/false", // bool值，传入应非bool类型，否则API会炸，是否开启加密
    "use_compression": "true/false", // bool值，传入应非bool类型，否则API会炸，是否开启压缩
    "sk": "xxx", // 连接密钥，一般在S/X TCP（P2P）连接才需要填写
    "node": "", // 节点ID，为数字
    "domain": "", // 非必须，在HTTP(S)域名才需要
    "locations": "", // （高级选项）非必须，仅有需要填写，维护可能不经常，会出现奇奇怪怪的Bug
    "header_X_From_Where": "", // （高级选项）非必须，仅有需要填写，维护可能不经常，会出现奇奇怪怪的Bug
    "host_header_rewrite": "" // （高级选项）非必须，仅有需要填写，维护可能不经常，会出现奇奇怪怪的Bug
}
```
返回示例：

```jsonc
{
    "status": 000, // 状态码，403为Token（csrf）无效或过期，404为数据缺失，500为服务器异常，200为创建成功
    "message": "xxx",
}
```
可能返回内容：

> 数据缺失
```jsonc
{
    "status": 404,
    "message": "XXX不能为空."
}

```
> 服务器异常
```jsonc
{
    "status": 500,
    "message": "服务器异常，请稍后重试."
}
```
> Token（csrf）过期
```jsonc
{
    "status": 403,
    "message": "登录无效或已过期."
}
```
> 更新成功
```jsonc
{
    "status": 200,
    "message": "隧道更新成功.",
    "id": "000"
}
```
## 3.DeleteTunnelAPI - 删除隧道API

> 该API用于删除隧道

请求示例：
```jsonc
{
    "type": "remove", // 指定操作类型为删除隧道
    "csrf": "1145141919810", // 登陆时返回的Token（csrf）值
    "id": "000", // 隧道ID
}
```
返回示例：

```jsonc
{
    "status": 403, // 状态码，403为Token（csrf）无效或过期，404为数据缺失，500为服务器异常，200为创建成功
    "message": "xxx", // 提示信息
}
```
可能返回内容：

> 数据缺失
```jsonc
{
    "status": 404,
    "message": "XXX不能为空."
}

```
> Token（csrf）过期
```jsonc
{
    "status": 403,
    "message": "登录无效或已过期."
}
```
> 服务器异常
```jsonc
{
    "status": 500,
    "message": "服务器异常，请稍后重试."
}

```
> 删除成功
```jsonc
{
    "status": 200,
    "message": "隧道删除成功.",
}
```
## 4.ListTunnel - 列出隧道（以及指定展示隧道数据）

> 该API有俩种请求示例，分别是展示全部隧道信息、展示ID对应隧道信息

请求示例：
```jsonc
{
    "type": "list", // 指定操作类型为列出隧道
    "csrf": "1145141919810", // 登陆时返回的Token（csrf）值
    "id": "000", // 隧道ID，不填写则展示全部隧道
}
```
返回示例：

> 未指定隧道ID时，多个隧道
```jsonc
{
    "status": 000, // 状态码，403为Token（csrf）无效或过期，404为数据缺失，500为服务器异常，200为获取成功
    "message": "xxx", // 提示信息
    "proxies": [ // 当状态码为200，请求成功时才会有
        {
            "id": "114514", // 隧道ID
            "uuid": null, // 隧道UUID（未开发）
            "username": "xxx", // 隧道归属用户名
            "proxy_name": "xxx", // 隧道名称
            "proxy_type": "tcp/udp/http/https/xtcp/stcp", // 隧道类型
            "local_ip": "127.0.0.1", // 本地IP
            "local_port": "11451", // 本地端口
            "use_encryption": "true/false", // 使用加密
            "use_compression": "true/false", // 使用压缩
            "domain": "", // 域名[http(s)隧道]
            "locations": "", // 高级选项，一般为空
            "host_header_rewrite": "", // 高级选项，一般为空
            "remote_port": "11451", // 远程端口
            "sk": "", // SK密钥，一般在 X/S TCP（P2P点对点连接隧道）启用
            "header_X-From-Where": "", // 高级选项，一般为空
            "status": "true/false", // 隧道启用状态
            "lastupdate": "000000000", // 上次编辑时间
            "node": "00", // 隧道选用节点ID
            "node_name": "114514哼哼哼啊啊啊啊啊啊啊啊啊", // 隧道选用节点名称
            "node_domain": "114514.cn" // 隧道选用节点域名
        },
        {
            "id": "1145141919810", // 隧道ID
            "uuid": null, // 隧道UUID（未开发）
            "username": "xxx", // 隧道归属用户名
            "proxy_name": "xxx", // 隧道名称
            "proxy_type": "tcp/udp/http/https/xtcp/stcp", // 隧道类型
            "local_ip": "127.0.0.1", // 本地IP
            "local_port": "19810", // 本地端口
            "use_encryption": "true/false", // 使用加密
            "use_compression": "true/false", // 使用压缩
            "domain": "", // 域名[http(s)隧道]
            "locations": "", // 高级选项，一般为空
            "host_header_rewrite": "", // 高级选项，一般为空
            "remote_port": "19810", // 远程端口
            "sk": "", // SK密钥，一般在 X/S TCP（P2P点对点连接隧道）启用
            "header_X-From-Where": "", // 高级选项，一般为空
            "status": "true/false", // 隧道启用状态
            "lastupdate": "000000000", // 上次编辑时间
            "node": "00", // 隧道选用节点ID
            "node_name": "114514哼哼哼啊啊啊啊啊啊啊啊啊", // 隧道选用节点名称
            "node_domain": "114514.cn" // 隧道选用节点域名
        }
    ]
}
```

> 指定隧道ID时，单隧道
```jsonc
{
    "status": 000, // 状态码，403为Token（csrf）无效或过期，404为数据缺失，500为服务器异常，200为获取成功
    "message": "xxx", // 提示信息
    "proxies": [ // 当状态码为200，请求成功时才会有
        {
            "id": "114514", // 隧道ID
            "uuid": null, // 隧道UUID（未开发）
            "username": "xxx", // 隧道归属用户名
            "proxy_name": "xxx", // 隧道名称
            "proxy_type": "tcp/udp/http/https/xtcp/stcp", // 隧道类型
            "local_ip": "127.0.0.1", // 本地IP
            "local_port": "11451", // 本地端口
            "use_encryption": "true/false", // 使用加密
            "use_compression": "true/false", // 使用压缩
            "domain": "", // 域名[http(s)隧道]
            "locations": "", // 高级选项，一般为空
            "host_header_rewrite": "", // 高级选项，一般为空
            "remote_port": "11451", // 远程端口
            "sk": "", // SK密钥，一般在 X/S TCP（P2P点对点连接隧道）启用
            "header_X-From-Where": "", // 高级选项，一般为空
            "status": "true/false", // 隧道启用状态
            "lastupdate": "000000000", // 上次编辑时间
            "node": "00", // 隧道选用节点ID
            "node_name": "114514哼哼哼啊啊啊啊啊啊啊啊啊", // 隧道选用节点名称
            "node_domain": "114514.cn" // 隧道选用节点域名
        }
    ]
}
```
可能返回内容：

> 数据缺失
```jsonc
{
    "status": 404,
    "message": "XXX不能为空."
}

```
> Token（csrf）过期
```jsonc
{
    "status": 403,
    "message": "登录无效或已过期."
}
```
> 服务器异常
```jsonc
{
    "status": 500,
    "message": "服务器异常，请稍后重试."
}

```
> 请求成功
```jsonc
{
    "status": 000,
    "message": "xxx",
    "proxies": [
        ...
    ]
}
```

## 5.TunnelConfig - 配置文件获取

> 本API可以获取隧道配置文件，传入数据方式有俩种
>
> 一种是提交节点ID，可直接获取节点配置和节点下所有隧道的配置文件
>
> 另一种是传入隧道ID，可直接获取对应隧道的节点配置和隧道配置
>
> 且该API可同时生成INI/TOML俩种配置文件格式，还支持直接显示XTCP/STCP隧道的连接配置文件(等待支持，测试中).

请求示例：
```jsonc
{
    "type": "config", // 指定操作为获取配置文件
    "format": "ini/toml", // 指定配置文件格式
    "csrf": "1145141919810", // 登陆时获取的Token（csrf）
    "node": "00", // 指定节点ID（填写了则不可存在隧道ID）
    "proxy": "114514" // 指定隧道ID（填写了则不可存在节点ID）
}
```

返回示例：
```
直接返回配置文件

```
可能返回的内容：

> 数据缺失
```jsonc
{
    "status": 404,
    "message": "XXX不能为空."
}

```
> Token（csrf）过期
```jsonc
{
    "status": 403,
    "message": "登录无效或已过期."
}
```
> 服务器异常
```jsonc
{
    "status": 500,
    "message": "服务器异常，请稍后重试."
}

```
> 请求成功
```
直接返回配置文件
```

## 6.ToggleTunnel - 隧道状态更改
> 本API用于启用/禁用隧道

请求示例：
```jsonc
{
    "type": "toggle", // 指定操作为更改隧道状态
    "csrf": "1145141919810", // 登陆时获取的Token（csrf）
    "id": "114514", // 指定隧道ID
    "toggle": "true/false" // 指定隧道状态
}
```

返回示例：
```jsonc
{
    "status": 000, // 状态码，403为Token（csrf）无效或过期，404为数据缺失，500为服务器异常，200为更改成功
    "message": "xxx" // 提示信息
}
```
可能返回内容：

> 数据缺失
```jsonc
{
    "status": 404,
    "message": "XXX不能为空."
}

```
> Token（csrf）过期
```jsonc
{
    "status": 403,
    "message": "登录无效或已过期."
}
```
> 服务器异常
```jsonc
{
    "status": 500,
    "message": "服务器异常，请稍后重试."
}

```
> 请求成功
```jsonc
{
    "status": 200,
    "message": "隧道状态已成功修改为 启用/禁用."
}
```

## 7.GetTunnelStatus - 获取隧道状态
> 该API可获取隧道当前的在线状态

请求示例：
```jsonc
{
    "type": "check", // 指定操作为检查隧道
    "csrf": "1145141919810", // 登陆时获取的Token（csrf）
    "id": "114514" // 隧道ID
}
```

返回示例：
```jsonc
{
    "status": 000, // 状态码，403为Token（csrf）无效或过期，404为数据缺失，500为服务器异常、隧道离线，200为隧道在线
    "message": "xxx", // 提示信息
    "ostatus": "online/offline" // 隧道状态，当状态码为200/500时会提示隧道在线/离线
}
```

可能返回内容：

> 数据缺失
```jsonc
{
    "status": 404,
    "message": "XXX不能为空."
}

```
> Token（csrf）过期
```jsonc
{
    "status": 403,
    "message": "登录无效或已过期."
}
```
> 服务器异常
```jsonc
{
    "status": 500,
    "message": "服务器异常，请稍后重试."
}

```
> 隧道离线
```jsonc
{
    "status": 500,
    "message": "隧道离线，请检查隧道配置."
}

```
> 隧道对应节点离线
```jsonc
{
    "status": 500,
    "message": "隧道离线，隧道对应节点已离线."
}
> 隧道在线
```jsonc
{
    "status": 200,
    "message": "隧道在线."
}

```

## 8.ForceDownTunnel - 强制下线隧道
> 该API可强制下线隧道

请求示例：
```jsonc
{
    "type": "forcedown", // 指定操作为强制下线隧道
    "csrf": "1145141919810", // 登陆时获取的Token（csrf）
    "id": "114514" // 隧道ID
}
```

返回示例：
```jsonc
{
    "status": 000, // 状态码，403为Token（csrf）无效或过期，404为数据缺失，500为服务器异常、节点离线，200为强制下线成功
    "message": "xxx", // 提示信息
}
```

可能返回内容：

> 数据缺失
```jsonc
{
    "status": 404,
    "message": "XXX不能为空."
}

```
> Token（csrf）过期
```jsonc
{
    "status": 403,
    "message": "登录无效或已过期."
}
```
> 服务器异常
```jsonc
{
    "status": 500,
    "message": "服务器异常，请稍后重试."
}

```
> 节点离线
```jsonc
{
    "status": 500,
    "message": "隧道对应节点已离线，无法强制下线."
}
```
> 请求成功
```jsonc
{
    "status": 200,
    "message": "隧道已强制下线."

}
```

# Third - 杂项

> 这部分API没用全局路径，且全部API请求方式为GET
>
> 注意：GetNodeInfo和GetNodeList两个API节点可能不相同，表现于GetNodeList的节点数 > GetNodeInfo
>
> 这是因为节点数据可能拉取失败或者HayFrps服务端非官方，出现此类事件请反馈节点ID到QQ群。

## 1.GetNodeInfo - 节点探针信息获取

> 地址：/node
> 请求方式：GET
> 本API用于获取节点探针信息

请求示例：
```
直接Get请求，无需传参
```

返回示例：
```jsonc
{
    "status": 200, // 状态码，基本为200，500则为服务器故障，404无节点数据
    "message": "获取成功", // 提示信息
    "number": 114514, // 当前在线节点数量
    "servers": [ // 节点列表
        {
            "id": "1", // 节点ID
            "name": "中国-苏州-永乐云服务器", // 节点名称
            "version": "0.59.0", // 节点正在运行的HayFrps服务端版本
            "bind_port": "7000", // 开放连接端口
            "bind_udp_port": "0", // 绑定UDP端口（新版已被移除，该项目前已舍弃）
            "vhost_http_port": "80", // VHOST(HTTP)端口
            "vhost_https_port": "443", // VHOST(HTTPS)端口
            "kcp_bind_port": "7000", // KCP绑定端口，和“开放连接端口”一直
            "subdomain_host": "", // 节点子域名
            "max_pool_count": "1000", // 最大池计数
            "max_ports_per_client": "0", // 最大端口接受客户端（0为关闭）
            "heart_beat_timeout": "-1", // 心跳超时（-1为关闭）
            "total_traffic_in": "168037627", // 今日入网（单位Bytes）
            "total_traffic_out": "5665967875", // 今日出网（单位Bytes）
            "cur_conns": "2", // 当前连接数（不包含“Frpc客户端数量”）
            "client_counts": "47", // 当前Frpc客户端数量（不包含“当前连接数”）
            "cpu_usage": "0.00%", // CPU占用率
            "ram_usage": "0.01%", // 运存占用率
            "disk_usage": "95.65%", // 磁盘占用率
            "status": "高负荷" // 节点负荷状态
        },
        ...
    ]
}
```

可能返回内容：
> 服务器异常
```jsonc
{
    "status": 500,
    "message": "服务器异常，请稍后重试."
}

```
> 无节点数据
```jsonc
{
    "status": 404,
    "message": "无节点数据."
}

```
> 获取成功
```jsonc
{
    "status": 200,
    "message": "获取成功",
    "number": 114514,
    "servers": [
        {
            "id": "1",
            "name": "中国-苏州-永乐云服务器",
            "version": "0.59.0",
            "bind_port": "7000",
            "bind_udp_port": "0",
            "vhost_http_port": "80",
            "vhost_https_port": "443",
            "kcp_bind_port": "7000",
            "subdomain_host": "",
            "max_pool_count": "1000",
            "max_ports_per_client": "0",
            "heart_beat_timeout": "-1",
            "total_traffic_in": "168037627",
            "total_traffic_out": "5665967875",
            "cur_conns": "2",
            "client_counts": "47",
            "cpu_usage": "0.00%",
            "ram_usage": "0.01%",
            "disk_usage": "95.65%",
            "status": "高负荷"
        },
        ...
    ]
}
```
## 2.GetNodeList - 节点列表获取

> 地址：/nodes
> 请求方式：GET
> 本API用于获取状态码为200的节点列表以及节点介绍

请求示例：
```
直接Get请求，无需传参
```

返回示例：
```jsonc
{
    "status": 200, // 状态码，一般来说为200，为500服务器异常，为404没有在线的节点
    "message": "获取成功", // 提示信息
    "number": 114514, // 当前在线节点数量
    "servers": [ // 节点列表
        {
            "id": "1", // 节点ID
            "name": "中国-苏州-永乐云服务器", // 节点名
            "description": "[|1000Mbps | 国内穿透推荐]" // 节点介绍
        },
        ...
    ]
}

```

可能返回内容：
> 服务器异常
```jsonc
{
    "status": 500,
    "message": "服务器异常，请稍后重试."
}

```
> 无节点数据
```jsonc
{
    "status": 404,
    "message": "无节点数据."
}

```
> 获取成功
```jsonc
{
    "status": 200,
    "message": "获取成功",
    "number": 114514,
    "servers": [
        {
            "id": "1",
            "name": "中国-苏州-永乐云服务器",
            "description": "[|1000Mbps | 国内穿透推荐]"
        },
        ...
    ]
}
```

## 3.GetNotice - 公告获取

> **/notice**
> `GET`


请求示例：
```
直接Get请求，无需传参
```

返回示例：
```
直接返回HTML代码
```

可能返回内容：
> 服务器异常
```jsonc
{
    "status": 500,
    "message": "服务器异常，请稍后重试."
}

```
> 获取成功
```
直接返回HTML代码
```

## 4.HayFrpINFO - HayFrp服务统计
> */info*
> `GET`

请求示例：
```
直接Get请求，无需传参
```

返回示例：
```jsonc
{
    "status": 200, // 状态码，一般都是200，为500服务器异常
    "aflow": "6560606", // HayFrp总流量（单位MB）
    "aflowin": "1208662", // HayFrp总入网流量（单位MB）
    "aflowout": "5352284", // HayFrp总出网流量（单位MB）
    "eflow": "9220", // HayFrp今日总流量（单位MB）
    "eflowin": "802", // HayFrp今日总入网流量（单位MB）
    "eflowout": "8417", // HayFrp今日总出网流量（单位MB）
    "oclient": 107, // 当前在线客户端
    "totalrun": "114842262", // 客户端总共请求启动隧道次数
    "todayrun": "34580" // 今日客户端总共请求启动隧道次数
}
```

可能返回内容：
> 服务器异常
```jsonc
{
    "status": 500,
    "message": "服务器异常，请稍后重试."
}

```
> 获取成功
```jsonc
{
    "status": 200,
    "aflow": "6560606",
    "aflowin": "1208662",
    "aflowout": "5352284",
    "eflow": "9220",
    "eflowin": "802",
    "eflowout": "8417",
    "oclient": 107,
    "totalrun": "114842262",
    "todayrun": "34580"
}
```

## 5.DownloadList - 下载列表
> */downlist*
> `GET`

请求示例：
```
直接Get请求，无需传参
```

返回示例：
```jsonc
{
    "status": 200, // 状态码，一般为200，为500服务器异常
    "message": "获取成功!", // 提示信息
    "source": [ // 下载源列表
        {
            "name": "和谐下载站", // 下载源名称
            "url": "https://down.hxit.top/HayFrp/Releases/" // 下载源地址
        },
        ...
    ],
    "lists": [ // 文件列表
        {
            "name": "Frp安卓版Arm64-V8a", // 文件化名
            "url": "app-arm64-v8a-release-v1.0.3.apk", // 文件地址名称
            "arch": "android_arm64", // 架构
            "version": "0.56.0" // 版本号
        },
        ...
    ]
}

```
可能返回内容：
> 服务器异常
```jsonc
{
    "status": 500,
    "message": "服务器异常，请稍后重试."
}

```
> 获取成功
```jsonc
{
    "status": 200,
    "message": "获取成功!",
    "source": [
        {
            "name": "和谐下载站",
            "url": "https://down.hxit.top/HayFrp/Releases/"
        },
        ...
    ],
    "lists": [
        {
            "name": "Frp安卓版Arm64-V8a",
            "url": "app-arm64-v8a-release-v1.0.3.apk",
            "arch": "android_arm64",
            "version": "0.56.0"
        },
        ...
    ]
}
```

## 6.Version - 版本信息
> */version*
> `GET`

请求示例：
```
直接Get请求，无需传参
```

返回示例：
```jsonc
{
    "ver_hayfrps": "0.59.0", // HayFrps版本
    "ver_frpc": "0.59.0", // Frpc最新版
    "ver_launcher": "3.0", // 启动器版本
    "ver_console": "3.0", // 控制台版本
    "ver_dashboard": "1.0", // 服务商Dashboard版本
    "url_launcher": "http://114514.cn", // 启动器下载源
}

```
可能返回内容：
> 请求成功
```jsonc
{
    "ver_hayfrps": "0.59.0",
    "ver_frpc": "0.59.0",
    "ver_launcher": "3.0",
    "ver_console": "3.0",
    "ver_dashboard": "1.0",
    "url_launcher": "http://114514.cn",
}
```