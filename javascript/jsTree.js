(function($){
	//定义的节点id，每次新增节点都自增1
	var count = 1;
	//插件默认配置
	var defaults = {
		parent: document.body,
		data: [
		{
				name: '父节点-',
				id: 1,
				subnodes: {
					name: '子节点-',
					id: 11
				}
			},
			{
				name: '父节点-',
				id: 2,
				subnodes: {
					name: '子节点-',
					id: 14
				} 
		}]		
	};
	
	var Main = {
		//初始化树
		init: function(options) {
			var opt = $.extend({}, defaults, options),
				parent = opt.parent;
			//缓冲插件父节点
			this.data('jstree', {
				parent: parent
			});
			parent.appendChild(Main.buildTree(opt.data));
			//添加展示隐藏子节点事件
			$(document.body).on('click.jstree', '.tree-node', function(event){
				$(this).find('ul').toggleClass('f-dn');
				event.stopPropagation();
			});

			//鼠标进入显示操作icon
			$(document.body).on('mouseover.jstree', '.tree-node', function(event) {
				$(this).find('.f-icon').eq(0).css({display:'inline-block'});
				event.stopPropagation();
			});
			//鼠标移出隐藏操作icon
			$(document.body).on('mouseout.jstree', '.tree-node', function(event) {
				$(this).find('.f-icon').eq(0).css({display:'none'});
				event.stopPropagation();
			});
			//新增删除子节点事件
			$(document.body).on('click.jstree', '.add-icon, .del-icon', function(event) {
				if ($(this).hasClass('add-icon')) {
					$(this).closest('.tree-node').eq(0).find('ul').removeClass('f-dn').end().append(Main.generateSubNode({id: Date.now(), name: '新增节点-'})).end().addClass('super');

				}else if ($(this).hasClass('del-icon')) {
					var $parent = $(this).closest('.tree-node').parents('.tree-node').eq(0);
					$(this).closest('.tree-node').remove();
					if ($parent.find('.tree-node').length == 0) {
						$parent.removeClass('super');
					}
				}
				event.stopPropagation();
			});
			return this;
		},
		//构造树
		buildTree: function(data) {
			var node = document.createElement('ul'),
				str = '';
			node.className = 'tree';
			$.each(data, function(index, value) {
				if (index == 'parent') {
					return;
				}
				count ++ ;
				if (value.subnodes) {
					str += '<li class="tree-node super" id='+count+'>';
				}else {
					str += '<li class="tree-node" id='+count+'>';
				}
				// str += '<li class="tree-node" id='+count+'>';
				str += '<a data-id='+value.id+'>'+value.name+''+count+'</a><a href="#" class="f-icon"><span class="add-icon"></span><span class="del-icon"></span></a>';
				if (value.subnodes) {
					str += Main.generateSubNode(value.subnodes).outerHTML;
				}
				str += '</li>';	
			});
			node.innerHTML = str;
			return node;
		},
		//生成新的子节点
		generateSubNode: function(data) {
			var str = '',
				node = document.createElement('ul');
			count++;
			str += '<li class="tree-node" id='+count+'>';
			str += '<a data-id='+data.id+'>'+data.name+''+count+'<a href="#" class="f-icon"><span class="add-icon"></span><span class="del-icon"></span></a></li>';
			str += '</li>';
			node.className = 'tree';
			node.innerHTML = str;
			return node;
		},
		//查找子节点
		findNode: function(id) {
			var parent = this.data('jstree').parent,
				$curnode = $(parent).find('a').removeClass('f-active').end().find('#'+id).find('a').eq(0),//当前节点
				$treenode = $curnode.parents('.tree').eq(0); 
			$curnode.addClass('f-active');
			while($treenode.length > 0){
				$treenode.siblings().removeClass('f-dn').end().removeClass('f-dn');
				$treenode = $treenode.parents('.tree').eq(0);
			}
		}
	};
	//定义插件
	$.fn.extend({
		'jsTree': function(method) {
			if (Main[method]) {
		      return Main[method].apply(this, Array.prototype.slice.call(arguments, 1 ));
		    } else if ( typeof method === 'object' || ! method ) {
		      return Main.init.apply(this, arguments);
		    } else {
		      $.error( 'Method ' +  method + ' does not exist on jQuery.jstree' );
		    } 
		}
	});	
}(window.jQuery))
