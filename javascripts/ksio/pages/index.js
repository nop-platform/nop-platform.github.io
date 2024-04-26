(function() {
  $(document).on("click", ".Nav-cell a", function() {
    var $el, cls;
    $el = $(this);
    cls = "is-active";
    $(".Navs ." + cls + ", .Grids ." + cls).removeClass(cls);
    $(".Grids [data-flag='" + ($el.attr("data-flag")) + "']").add($el).addClass(cls);
    return false;
  });

  $(document).ready(function() {
    var $cnt;
    $(".Navs [data-flag]:first").click();
    $(".Repo, .Site").each(function() {
      if (this.hostname !== location.hostname) {
        return $(this).attr("target", "_blank");
      }
    });
    $cnt = $('.Moments');
    return $('.js-affix').each(function() {
      return $(this).on({
        "affixed-top.bs.affix": function() {
          return $(this).css({
            position: 'static',
            width: 'auto'
          });
        },
        "affixed.bs.affix": function() {
          return $(this).css({
            position: "fixed",
            width: $(this).parent().width()
          });
        }
      }).affix({
        offset: {
          top: $(this).offset().top,
          bottom: function() {
            return $(document).height() - ($cnt.offset().top + $cnt.outerHeight(true));
          }
        }
      });
    });
  });

}).call(this);
