# auto-doc


## Mac OS 以debug模式启动Chrome, 在.bash_profile里面加入代码


### 启动Chrome调试模式

在.bash_profile中增加下面的代码

```
function  debugchrome
{
    /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome  --remote-debugging-port=9222  --no-first-run --no-default-browser-check --user-data-dir=$(mktemp -d -t 'chrome-remote_data_dir')  "$searchURLPrefix$query"

}
```

重新开一个窗口，然后

```
$ debugchrome

```

DevTools listening on ws://127.0.0.1:9222/devtools/browser/ab2a4be8-c746-4acb-be91-ecd535db6746




### 启动测试


```
$ yarn install 
$ node freshchain
```

会得到一个url, 这个URL放入freshchain.js中进行测试


### 测试抓图

```
$ node remote-png
```
查看baidu.png





