(function($){
    /**
     * @param {Object} options
     * @return {Object} jQuery Object this;
     */
    $.fn.maxlength = function (options){
        var settings = $.extend(
            {},
            $.fn.maxlength.defaults,
            options
        );

        var counterElm = '<span class="text-limit">' +
            '<span data-val-length="target"></span>' +
            '<span data-val-length="max"></span>' +
            '</span>';

        return this.each(function () {
            var $wrap = $(this);
            var $val = $wrap.find('[maxlength]');
            var $parent = $wrap.find(settings.parent);
            var maxLength = $val.attr('maxlength');

            if (!$wrap.find('.text-limit').length) {
                $parent.length ? $parent.append(counterElm) : $wrap.append(counterElm);
                $wrap.find(settings.target).html($val.val().length);
                $wrap.find(settings.maxTarget).html('/' + maxLength);

                $wrap.on('keyup', settings.valName, function (e) {
                    var input = e.currentTarget;
                    var val = input.value;
                    if (val.length > maxLength) input.value = val.substr(0, maxLength);
                    $wrap.find(settings.target).html(input.value.length);
                });
            }
        });
    };

    $.fn.maxlength.defaults = {
        valName: '[maxlength]',
        target: '[data-val-length=target]',
        maxTarget: '[data-val-length=max]',
        parent: '[data-val-length=parent]',
    };
})(jQuery);