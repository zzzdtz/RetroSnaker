;(function (window, undefined){
	/**
		Food: 食物构造函数
	*/
	function Food(parent, options){
		if(!parent || !parent.nodeName){
			throw "element is required";
		};
		this.options = {
			width: 20,
			height: 20,
			x: 0,
			y: 0,
			className: "",
			name: "",
			text: "",
			backgroundColor: ""
		};
		
		this.colors = ["#F0F8FF", "#FAEBD7", "#00FFFF", "#7FFFD4", "#F0FFFF", "#F5F5DC", "#FFE4C4", "#FFEBCD", "#0000FF", "#8A2BE2", "#A52A2A", "#DEB887", "#5F9EA0", "#7FFF00", "#D2691E", "#FF7F50", "#6495ED", "#FFF8DC", "#DC143C", "#00FFFF", "#00008B", "#008B8B", "#B8860B", "#A9A9A9","#006400","#BDB76B","#8B008B","#556B2F","#FF8C00","#9932CC","#8B0000","#E9967A","#8FBC8F","#483D8B","#2F4F4F","#00CED1","#9400D3","#FF1493","#00BFFF","#696969","#1E90FF","#D19275","#B22222","#FFFAF0","#228B22","#FF00FF","#DCDCDC","#F8F8FF","#FFD700","#DAA520","#808080","#008000","#ADFF2F","#F0FFF0","#FF69B4","#CD5C5C","#4B0082","#FFFFF0","#F0E68C","#E6E6FA","#FFF0F5","#7CFC00","#FFFACD","#ADD8E6","#F08080","#E0FFFF","#FAFAD2","#D3D3D3","#90EE90","#FFB6C1","#FFA07A","#20B2AA","#87CEFA","#8470FF","#778899","#B0C4DE","#FFFFE0","#00FF00","#32CD32","#FAF0E6","#FF00FF","#800000","#66CDAA","#0000CD","#BA55D3","#9370D8","#3CB371","#7B68EE","#00FA9A","#48D1CC","#C71585","#191970","#F5FFFA","#FFE4E1","#FFE4B5","#FFDEAD","#000080","#FDF5E6","#808000","#6B8E23","#FFA500","#FF4500","#DA70D6","#EEE8AA","#98FB98","#AFEEEE","#D87093","#FFEFD5","#FFDAB9","#CD853F","#FFC0CB","#DDA0DD","#B0E0E6","#800080","#FF0000","#BC8F8F","#4169E1","#8B4513","#FA8072","#F4A460","#2E8B57","#FFF5EE","#A0522D","#C0C0C0","#87CEEB","#6A5ACD","#708090","#FFFAFA","#00FF7F","#00FF7F","#D2B48C","#008080","#D8BFD8","#FF6347","#40E0D0","#EE82EE","#D02090","#F5DEB3","#FFFFFF","#F5F5F5","#FFFF00","#9ACD32"];
		tool.extend(this.options, true, options || {});
		this.options.className += " food";
		this.parent = parent;
		this.name = "";

		this._init();
	}
	/**
		初始化食物对象
	*/
	Food.prototype._init = function (){
		var _ele = document.createElement("div");
		if(!this.options.backgroundColor){
			this.options.backgroundColor = this.colors[Math.floor(Math.random() * this.colors.length)];
		}
		if(!this.options.name){
			this.name = this.options.name = "food_" + Math.random().toString(36).substring(2, 8);
		}else{
			this.name = this.options.name;
		}
		this.x = this.options.x;
		this.y = this.options.y;
		tool.css(_ele, "width", this.options.width);
		tool.css(_ele, "height", this.options.height);
		tool.css(_ele, "position", "absolute");
		tool.css(_ele, "left", this.x);
		tool.css(_ele, "top", this.y);
		tool.css(_ele, "backgroundColor", this.options.backgroundColor);
		_ele.innerHTML = this.options.text;

		_ele.className = this.options.className;
		this.ele = _ele;
		this.parent.appendChild(this.ele);
	}
	/**
		设置食物的宽度
	*/
	Food.prototype.setWidth = function (w){
		if(typeof w === "undefined"){
			return;
		}
		tool.css(this.ele, "width", w);
		this.options.width = w;
		return this;
	}
	/**
		设置食物的高度
	*/
	Food.prototype.setHeight = function (h){
		if(typeof h === "undefined"){
			return;
		}
		tool.css(this.ele, "height", h);
		this.options.height = h;
		return this;
	}
	/**
		设置食物的位置
	*/
	Food.prototype.setPosition = function (x, y){
		if(typeof x !== "undefined"){
			x = Number(x);
			this.x = x;
			tool.css(this.ele, "left", x);
		}
		if(typeof y !== "undefined"){
			y = Number(y);
			this.y = y;
			tool.css(this.ele, "top", y);
		}
		return this;
	}

	window.Food = Food;
})(window, undefined);