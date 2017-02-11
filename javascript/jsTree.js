(function($){
	var count = 1;

	$.fn.extend({
		'jsTree': function(options) {
			var opt = $.extend({}, defaults, options)
			
			if (!opt.parent) {
				opt.parent = document.body;
			}

			var parent = opt.parent;
			
			parent.appendChild(initTree(opt));
			// parent.innerHTML = str;

			//添加事件
			$(document.body).on('click.tree-node', '.tree-node', function(event){
				console.log(this);
				$(this).find('ul').toggleClass('f-dn');
				// console.log(1);
				event.stopPropagation();
			});

			//鼠标移动显示隐藏操作icon

			$(document.body).on('mouseover', '.tree-node', function(event) {
				$(this).find('.f-icon').eq(0).css({display:'inline-block'});
				event.stopPropagation();
			});

			$(document.body).on('mouseout', '.tree-node', function(event) {
				$(this).find('.f-icon').eq(0).css({display:'none'});
				event.stopPropagation();
			});
			//新增删除子节点事件
			$(document.body).on('click.icon', '.add-icon, .del-icon', function(event) {
				console.log(this);
				if ($(this).hasClass('add-icon')) {
					// var ul = $(this).parents('ul').get(0),
					// 	$curli = $(this).parents('li').eq(0),
					// 	node = generateSubNode($curli.text(), $curli.data('id'));

					// ul.insertBefore(node, $curli.next().get(0));
					// $curli.remove();
					$(this).closest('.tree-node').get(0).appendChild(generateTreeNode({id: Date.now(), name: '新增节点-'}));
				}else if ($(this).hasClass('del-icon')) {
					// $(this).parents('li').eq(0).remove();
					$(this).closest('.tree-node').remove();
				}

				event.stopPropagation();
			});
			// console.log(str);
			// return this.each(function() {

			// });
			// return this;
		}
	});

	$.fn.jsTree.findNode = function(id) {

		$(document.body).find('a').removeClass('f-active').end().find('#'+id).find('a').eq(0).addClass('f-active');
	};

	function generateTreeNode (data) {
		count++;

		var str = '<li class="tree-node" id='+count+'>';
		str += '<a data-id='+data.id+'>'+data.name+''+count+'<a href="#" class="f-icon"><span class="add-icon"></span><span class="del-icon"></span></a></li>';
		
		str+='</li>';

		var node = document.createElement('ul');
		node.className = 'tree';
		node.innerHTML = str;

		

		return node;
	}

	function initTree (data) {
		
		var node = document.createElement('ul');
		node.className = 'tree';
		var str = '';
		$.each(data, function(index, value) {

			if (index == 'parent') {
				return;
			}
			count ++ ;
			str += '<li class="tree-node" id='+count+'>';

			str += '<a data-id='+value.id+'>'+value.name+''+count+'</a><a href="#" class="f-icon"><span class="add-icon"></span><span class="del-icon"></span></a>';
			

			if (value.subnodes) {
				str += generateTreeNode(value.subnodes).outerHTML;
			}

			str += '</li>';	
		});

		node.innerHTML = str;

		
		return node;
	}

	var defaults = [{
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
	}];
		
}(window.jQuery))
