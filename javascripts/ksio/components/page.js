
/*
 * 重置侧边栏位置
 *
 * TODO: 当有页头横幅并且其高度随着页面拉伸发生变化时，
 *       需要重新设置侧边栏位置
 */

(function() {
  var repositionSidebar, separateWidgets;

  repositionSidebar = function() {
    var $footer, $header, $sidebar, offsetTop;
    $sidebar = $(".Page-sidebar");
    $header = $(".Article-header");
    $footer = $(".Article-footer");
    if ($sidebar.size()) {
      if ($footer.size()) {
        offsetTop = $footer.offset().top - $header.offset().top + $footer.outerHeight(true) + 20;
      } else {
        offsetTop = $header.css("padding-top");
      }
      $sidebar.css("margin-top", offsetTop);
    }
    return $sidebar;
  };

  separateWidgets = function() {
    var $share, $widget, cls;
    cls = "is-separated";
    $share = $(".Widget--share");
    $widget = $share.next(".Widget");
    if ($widget.size() && $(".Widget-header", $widget).size() === 0) {
      $widget.addClass(cls);
    }
    if ($(".Widget").size() > 1) {
      return $(".Widget-header:first").closest(".Widget").addClass(cls);
    }
  };

  $(document).ready(function() {
    separateWidgets();
    return repositionSidebar();
  });

}).call(this);
