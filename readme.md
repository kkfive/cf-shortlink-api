## 说明

基于CF Worker+KV搭建的简单短链程序，支持设置过期时间以及自定义KEY。

## 食用方案

1. Fork此项目

2. GitHub仓库中`setting->Secrets`添加两个字段`CF_API_TOKEN`和`PASSWORD`。分别表示cf的api key和请求api接口时的密钥

   - `CF_API_TOKEN`如果你不知道如何获取，那么请参考下文获取
   - `PASSWORD`请不要设置特殊字符

   ![image-20220731213642237](https://file.acs.pw/image/2022/07/31/dd41673e917a1de82a7a6aa99f2b6dba.png)

3. 打开`Actions`（点击绿色按钮）

   ![image-20220731213120498](https://file.acs.pw/image/2022/07/31/e07ae6b6dbc6ac69633c472dafdc20ce.png)

4. 修改`wrangler.toml`文件的`account_id`和`kv_namespaces`对应的ID

   - `account_id`就是点击worker时显示的账户id
   - `kv_namespaces`需要手动创建kv存储

   ![image-20220731213045086](https://file.acs.pw/image/2022/07/31/4145e4b300eeae33c03e6f4d9d56e950.png)

5. 不出意外的话，等待部署成功后即可使用

   > 如果没有触发actions的话，那么在无关代码的文件中 随意添加个空格换行，然后重写提交一次即可触发。

6. 前端面板

   你可以选择自行搭建，也可以直接使用我的前端面板。地址：https://link.kkfive.top/

   ![image-20220731214210438](https://file.acs.pw/image/2022/07/31/71df4f42e0ee41a9d34cb1b79d399707.png)

   ![image-20220731214303071](https://file.acs.pw/image/2022/07/31/017cff276674673ff11e544736577d97.png)

   ![image-20220731214343083](https://file.acs.pw/image/2022/07/31/6f5c89f76ce8f92efc05eefd7d438fa0.png)

### 获取cf api token

获取API KEY:https://dash.cloudflare.com/profile/api-tokens

![image-20220731212208358](https://file.acs.pw/image/2022/07/31/ebd24d44e92a7628f7af508a3db50a42.png)

![image-20220731212233687](https://file.acs.pw/image/2022/07/31/2ea7506de2bfb53c8b90ac1daeeeb3e0.png)

![image-20220731212350229](https://file.acs.pw/image/2022/07/31/437482e9683830cc0dbdacd8de8c5645.png)

> 图中文案写错，应该为API TOKEN 。其他不影响

### 获取KV存储的ID

![image-20220731212739953](https://file.acs.pw/image/2022/07/31/a815c968764ab7926e10e5153e084965.png)