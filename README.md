# auto-doc


## 以debug模式启动Chrome, 在.bash_profile里面加入代码

```
function  debugchrome
{
    /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome  --remote-debugging-port=9222  --no-first-run --no-default-browser-check --user-data-dir=$(mktemp -d -t 'chrome-remote_data_dir')  "$searchURLPrefix$query"

}
```

然后 

```
$ debugchrome

```
DevTools listening on ws://127.0.0.1:9222/devtools/browser/ab2a4be8-c746-4acb-be91-ecd535db6746

```
会得到一个url, 这个URL放入freshchain.js中进行测试



