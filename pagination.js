/*********************************************************************
 *   Filename:    pagination.js
 *   Version:     0.0.1
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
    parent: null,
    items: null,
    itemSum: null,
    currentPage: null,
    itemsOnEachPage: null,
    pages: null,
    pageLayer: null,

    init: function(_parent, _item, _pageLayer, _currentPage, _itemsOnEachPage) {
        _currentPage = typeof _currentPage !== 'undefined' ? _currentPage : 1;
        _itemsOnEachPage = typeof _itemsOnEachPage !== 'undefined' ? _itemsOnEachPage : 0;
        this.parent = $(_parent);
        this.items = this.parent.find(_item);
        this.pageLayer = $(_pageLayer);
        this.setCurrentPage(_currentPage);
        this.setItemsOnEachPage(_itemsOnEachPage);

        this.itemSum = this.items.length;
        this.pages = this.itemSum/this.itemsOnEachPage;
        if(this.pages <= 1 || this.currentPage > this.pages) {
            return;
        } else {
            this.renderButtons();
        }
    },

    renderButtons: function() {
        var buttons = [];
        if(this.currentPage > 1) {
            buttons.push(this.renderButton('Prev', this.currentPage-1));
        }
        if(this.pages > 10) {
            if(this.currentPage < 5) {
                for(var i = 1; i < 5 && i <= this.pages; i++) {
                    buttons.push(this.renderButton(i, i == this.currentPage));
                }
            } else {
                buttons.push(this.renderButton(1));
                buttons.push(this.renderButton(2));
                buttons.push(this.renderButton('..'));
                if(this.pages - this.currentPage <= 3) {
                    for(i = this.currentPage-2; i < 0 && i <= this.currentPage; i++) {
                        buttons.push(this.renderButton(i, i == this.currentPage));

                    }
                } else {
                    buttons.push(this.renderButton());
                }
            }
        } else {
            for(i = 1; i <= this.pages; i++) {
                buttons.push(this.renderButton(i, i == this.pages));
            }
        }
        if(this.currentPage < this.pages) {
            buttons.push(this.renderButton('Next', this.currentPage+1));
        }
        this.createPagination(buttons);
    },

    renderButton: function(label, page, active) {
        active = typeof active !== 'undefined' ? active : false;
        var button = $('<a>', {'class': 'page'}, {'href': 'javascript:void(0)'}, {'data-page': page}).text(label);
        if(active === true) {
            button.addClass('active');
        }
        return button;
    },

    createPagination: function(buttons) {
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
