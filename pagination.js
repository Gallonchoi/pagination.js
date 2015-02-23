/*********************************************************************
 *   Filename:    pagination.js
 *   Version:     0.0.2
 *
 *   Description: pagination implements in jQuery
 *
 *   Created at:  Fri Feb 20 11:56:18 2015
 *
 *   Gallon Choi is a student majoring in Software Engineering,
 *   from the School of Computer,
 *   Guangdong University of Technology, GZ 510006, P. R. China
 *
 *   Status:      Experimental, do not distribute.
 *
 ********************************************************************/
"use strict";

var pagination = {
    itemParent: null,
    items: null,
    itemSum: null,
    currentPage: null,
    itemsOnEachPage: null,
    pages: null,
    pageLayer: null,
    prevLabel: 'Prev',
    nextLabel: 'Next',

    init: function(_itemParent, _item, _pageLayer, _currentPage, _itemsOnEachPage) {
        if(_currentPage === false) {
            var param = window.location.hash;
            var regexp = new RegExp(/(page)(\d+)/);
            if(regexp.test(param)) {
                _currentPage = regexp.exec(param)[2];
                console.log(_currentPage);
            } else {
                _currentPage = 1;
            }
        }
        _itemsOnEachPage = typeof _itemsOnEachPage !== 'undefined' ? _itemsOnEachPage : 0;
        this.itemParent = $(_itemParent);
        this.items = this.itemParent.find(_item);
        this.pageLayer = $(_pageLayer);
        this.setCurrentPage(_currentPage);
        this.setItemsOnEachPage(_itemsOnEachPage);

        this.itemSum = this.items.length;
        this.pages = this.itemSum/this.itemsOnEachPage;
        this.pages = this.pages > parseInt(this.pages) ? parseInt(this.pages) + 1 : this.pages;
        if(this.pages <= 1) {
            return;
        } else if(this.currentPage > this.pages) {
            this.currentPage = this.pages;
        }
        this.showItem();
        this.renderButtons();
        var that = this;
        $('.pagination').on('click', '.page', function() {
            var page = $(this).data('page');
            that.nextPage(page);
        });
    },

    showItem: function() {
        this.items.hide();
        var start = (this.currentPage-1)*this.itemsOnEachPage;
        var end = this.currentPage*this.itemsOnEachPage;
        end = end > this.items.length ? this.items.length : end;
        for(var i = start; i < end; i++) {
            this.items[i].style.display = 'block';
        }
    },

    nextPage: function(page) {
        this.currentPage  = page;
        console.log(page);
        this.showItem();
        this.renderButtons();
        var param = window.location.hash;
        var regexp = new RegExp(/(page)(\d+)/);
        if(regexp.test(param)) {
            var newParam = param.replace(regexp, 'page'+page);
            window.location.hash = newParam;
        } else {
            window.location.hash += '&page' + page;
        }
    },

    renderButtons: function() {
        var buttons = [];
        if(this.currentPage > 1) {
            buttons.push(this.renderButton(this.prevLabel, this.currentPage-1, false, false));
        }
        if(this.pages > 10) {
            if(this.currentPage < 5) {
                for(var i = 1; i <= 5; i++) {
                    buttons.push(this.renderButton(i, i, false, i == this.currentPage));
                }
                buttons.push(this.renderButton('..', null, false, false));
                buttons.push(this.renderButton(this.pages-1, this.pages-1, false, false));
                buttons.push(this.renderButton(this.pages, this.pages, false, false));
            } else {
                buttons.push(this.renderButton(1, 1, false, false));
                buttons.push(this.renderButton(2, 2, false, false));
                buttons.push(this.renderButton('..', null, false, false));
                if(this.pages - this.currentPage <= 4) {
                    for(i = this.currentPage-2; i <= this.pages; i++) {
                        buttons.push(this.renderButton(i, i, false, i == this.currentPage));
                    }
                } else {
                    for(i = this.currentPage-1; i < this.currentPage+2 && i < this.pages; i++) {
                        buttons.push(this.renderButton(i, i, false, i == this.currentPage));
                    }
                    buttons.push(this.renderButton('..', null, false, false));
                    buttons.push(this.renderButton(this.pages-1, this.pages-1, false, false));
                    buttons.push(this.renderButton(this.pages, this.pages, false, false));
                }
            }
        } else {
            for(i = 1; i <= this.pages; i++) {
                buttons.push(this.renderButton(i, i, false, i == this.currentPage));
            }
        }
        if(this.currentPage < this.pages) {
            buttons.push(this.renderButton(this.nextLabel, this.currentPage+1, false, false));
        }
        this.createPagination(buttons);
    },

    renderButton: function(label, page, disable, active) {
        var button = $('<a>', {'href': 'javascript:void(0)', 'data-page': page}).text(label);
        if(disable === true) {
            button.addClass('disable');
        } else if(page !== null) {
            button.addClass('page');
        }
        if(active === true) {
            button.addClass('active');
        }
        return button;
    },

    createPagination: function(buttons) {
        this.pageLayer.empty();
        for(var i = 0; i < buttons.length; i++) {
            this.pageLayer.append(buttons[i]);
        }
    },

    setCurrentPage: function(_currentPage) {
        this.currentPage = _currentPage;
    },

    setItemsOnEachPage: function(_itemsOnEachPage) {
        this.itemsOnEachPage = _itemsOnEachPage;
    }
};
