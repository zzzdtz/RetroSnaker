;(function (window, undefined){
    if (typeof (webExtensionWallet) === "undefined") {
        toasts('您未安装WebExtensionWallet，为了不影响您的使用，请安装插件')
    } else {
        toasts('您已安装WebExtensionWallet');
         getWallectInfo();
        //alert(addresd);
    }

    function getWallectInfo() {
        window.postMessage({
            "target": "contentscript",
            "data": {},
            "method": "getAccount",
        }, "*");
        window.addEventListener('message', function (e) {
            if (e.data && e.data.data) {
                if (e.data.data.account) {//这就是当前钱包中的地址
                    window.authors = e.data.data.account;
                    $("#author-grade").text(authors);
                }
            }
        });


    }
    Number.prototype.isInteger = function (global) {
        var floor = Math.floor,
            isFinite = global.isFinite;

        Object.defineProperty(Number, 'isInteger', {
            value: function isInteger(value) {
                return typeof value === 'number' &&
                    isFinite(value) &&
                    floor(value) === value;
            },
            configurable: true,
            enumerable: false,
            writable: true
        });
    };

    function toasts(msg) {
        $.Toast(msg, "", "success", {
            appendTo: "body",
            stack: false,
            has_icon:true,
            has_close_btn:true,
            fullscreen:false,
            position_class: "toast-top-right",
            timeout:5000,
            width: 500,
            sticky:false,
            has_progress:true,
            rtl:false,
        });
    }


    $('#close-icon').on('click', function () {
        var dialog = $('#dialog');
        dialog.hide()
    })

    $('#btn').on('click', function () {
        var address = authors;
        var name = $('#name').val();
        if (address && score && name) {
            $('#dialog').hide();
            setData(address, score, name);
        } else {
            toasts('请您填写完整信息!!!');
        }
    })

    $(function () {
        // 请求全部信息
        querySubmitState(function (dataList, cb) {
            var html = '';
            var data = typeof dataList === 'string' ? JSON.parse(dataList) : dataList;
            if (data && data.length) {
                format(data);
                render(data);
            } else {
                toasts('出现未知错误, 请刷新浏览器，或联系我(anygh88@qq.com)。');
                cb && clearInterval(cb);
                setTimeout(function () {
                    closeToast();
                }, 1000);
            }
        })
    })



	var snakeBox = document.getElementById("snake_box"),
		gradeEle = document.getElementById("grade"),
		startBtn = document.getElementById("start_btn");
	var snakeGame = new SnakeGame(snakeBox, {
		speed: 'fast',
		eated: function(){
			gradeEle.innerHTML = this.getCount();
			window.score = this.getCount();



		},
		onDie: function (){
            ifDieOn = 1;

            if (Number.isInteger(score)){
                $("#score").val(score);
            }else{
                $("#score").val(0);
                window.score = 0;
            }


            $('#dialog').show();
			alert("Game Over!");
			window.bk =1;
		}
	});
    var dappContactAddress = "n1gQ1jjhY68v3tVejCWQCby8pawoH6KV3st";
    var nebulas = require("nebulas"), Account = Account, neb = new nebulas.Neb();
    var NebPay = require("nebpay");     //https://github.com/nebulasio/nebPay
    var nebPay = new NebPay();
    neb = new nebulas.Neb();
    neb.setRequest(new nebulas.HttpRequest("https://mainnet.nebulas.io"))
	//neb.setRequest(new nebulas.HttpRequest("https://testnet.nebulas.io"))




    function isInteger(obj) {
        return typeof obj === 'number' && obj%1 === 0
    }
    function setData (address, score, name) {
        toasts('请前往浏览器NAS插件操作');
        nebPay.call(dappContactAddress, "0", "set", JSON.stringify([address, score, name]), {
            listener: function(res){
                if (res.txhash) {
                    toasts('记录提交成功,正在查询信息请稍后...')
                    st = setInterval(function () {
                        querySubmitState(function (dataList) {
                            var data = typeof dataList === 'string' ? JSON.parse(dataList) : dataList;
                            if (data && data.length) {
                                for (var i = 0; i < data.length; i++) {
                                    if (data[i].address == address && data[i].name == name && data[i].score == score ) {
                                        clearInterval(st);
                                        format(data);
                                        render(data);
                                        return false;
                                    }
                                }
                            }
                        }, st)
                    }, 5000);
                } else {
                    editToast('信息添加失败,请稍后再试');
                    closeToast();
                }
            }
        })
    }


    function format (data) {
        all = data;
        dataObj = {};
        for (var i = 0; i < data.length; i++) {
            if (dataObj.hasOwnProperty(data[i].address)) {
                dataObj[data[i].address].push(data[i])
            } else {
                dataObj[data[i].address] = [data[i]]
            }
        }
    }


    function render (data) {
        var html = '';
        html += '<tr><th style="margin-top: 20px;"><p>昵称</p>'
            +'</th><th style="margin-top: 20px;"><p>分数</p></th>'
            +'<th style="margin-top: 20px;"><p>钱包地址</p></th></tr><tr>';

        for (var i = 0; i < data.length; i++) {
            html += '<td>'+data[i].name+'</td>'
                +'<td>'+data[i].score+'</td>'
                +'<td>'+data[i].address+'</td></tr>'
        }
        $('#table').html(html)
    }



    $(document).ready(function () {
        window.postMessage({
            "target": "contentscript",
            "data": {
            },
            "method": "getAccount",
        }, "*");
    });
    var serialNumber;
    

    function start_games() {

        var to = dappContactAddress;
        var value = "0";
        var callFunction = "start";
        var start_game = "start";
        var callArgs = "[\"" +  start_game + "\"]";
        serialNumber = nebPay.call(to, value, callFunction, callArgs, {    //使用nebpay的call接口去调用合约,
            listener: function (resp) {
                console.log("thecallback is " + resp)
            }

        });
        setTimeout(() => {
            onrefreshClick(serialNumber);
        }, 1000);
    }



    function getDealInfo() {

        window.addEventListener('message', function (resp) {
            if (resp.data && resp.data.resp && typeof(bk) === "undefined") {
                if (resp.data.resp.txhash ) {//这就是当前钱包中的地址
                    txhash = resp.data.resp.txhash,
                    snakeGame.start();
                    window.snakeStartMark =1;
                    alert('准备开始了,键盘左右键开始操控吧！')
                }else{
                    $("#toast").html("请支付后再试试！");
                }
            }


            //delete callbackMap[key];
        });

    }
    function onrefreshClick(serialNumber) {
        nebPay.queryPayInfo(serialNumber) //search transaction result from server (result upload to server by app)
            .then(function(resp) {
                console.log('----------------queryPayInfo-----------2');
                console.log(resp);
                getDealInfo();


            })
            .catch(function(err) {
                console.log('----------------queryPayInfo-----------1');
                console.log(err);

            });
    }

    function querySubmitState (cb) {
        nebPay.simulateCall(dappContactAddress, "0", "get", JSON.stringify([]), {
            listener: function(res) {
                if(res.result == '' && res.execute_err == 'contract check failed') {
                    toasts('合约检测失败，请检查浏览器钱包插件环境！');
                    return;
                }

                var dataList = JSON.parse(res.result);
                cb && cb(dataList)
            }
        })
    }
    startBtn.onclick = function (){
		if(typeof(started) === "undefined" && typeof(snakeStartMark) === "undefined"){

           toasts('需要支付一定的费用来开始游戏！')
           start_games();
            if(snakeStartMark === 1){
                window.started = true;
            }

		}else if(typeof(ifDieOn) !== "undefined"){

            toasts('游戏已经结束,请刷新后重新开始！！！')
        }else if(started){

            toasts('游戏已经开始了！！！')
        }
	}

})(window, undefined);