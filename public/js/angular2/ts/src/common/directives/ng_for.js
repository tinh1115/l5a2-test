System.register(['angular2/core', 'angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, lang_1;
    var NgFor, RecordViewTuple;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            /**
             * The `NgFor` directive instantiates a template once per item from an iterable. The context for
             * each instantiated template inherits from the outer context with the given loop variable set
             * to the current item from the iterable.
             *
             * # Local Variables
             *
             * `NgFor` provides several exported values that can be aliased to local variables:
             *
             * * `index` will be set to the current loop iteration for each template context.
             * * `last` will be set to a boolean value indicating whether the item is the last one in the
             *   iteration.
             * * `even` will be set to a boolean value indicating whether this item has an even index.
             * * `odd` will be set to a boolean value indicating whether this item has an odd index.
             *
             * # Change Propagation
             *
             * When the contents of the iterator changes, `NgFor` makes the corresponding changes to the DOM:
             *
             * * When an item is added, a new instance of the template is added to the DOM.
             * * When an item is removed, its template instance is removed from the DOM.
             * * When items are reordered, their respective templates are reordered in the DOM.
             * * Otherwise, the DOM element for that item will remain the same.
             *
             * Angular uses object identity to track insertions and deletions within the iterator and reproduce
             * those changes in the DOM. This has important implications for animations and any stateful
             * controls
             * (such as `<input>` elements which accept user input) that are present. Inserted rows can be
             * animated in, deleted rows can be animated out, and unchanged rows retain any unsaved state such
             * as user input.
             *
             * It is possible for the identities of elements in the iterator to change while the data does not.
             * This can happen, for example, if the iterator produced from an RPC to the server, and that
             * RPC is re-run. Even if the data hasn't changed, the second response will produce objects with
             * different identities, and Angular will tear down the entire DOM and rebuild it (as if all old
             * elements were deleted and all new elements inserted). This is an expensive operation and should
             * be avoided if possible.
             *
             * # Syntax
             *
             * - `<li *ngFor="#item of items; #i = index">...</li>`
             * - `<li template="ngFor #item of items; #i = index">...</li>`
             * - `<template ngFor #item [ngForOf]="items" #i="index"><li>...</li></template>`
             *
             * ### Example
             *
             * See a [live demo](http://plnkr.co/edit/KVuXxDp0qinGDyo307QW?p=preview) for a more detailed
             * example.
             */
            NgFor = (function () {
                function NgFor(_viewContainer, _templateRef, _iterableDiffers, _cdr) {
                    this._viewContainer = _viewContainer;
                    this._templateRef = _templateRef;
                    this._iterableDiffers = _iterableDiffers;
                    this._cdr = _cdr;
                }
                Object.defineProperty(NgFor.prototype, "ngForOf", {
                    set: function (value) {
                        this._ngForOf = value;
                        if (lang_1.isBlank(this._differ) && lang_1.isPresent(value)) {
                            this._differ = this._iterableDiffers.find(value).create(this._cdr, this._ngForTrackBy);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NgFor.prototype, "ngForTemplate", {
                    set: function (value) {
                        if (lang_1.isPresent(value)) {
                            this._templateRef = value;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NgFor.prototype, "ngForTrackBy", {
                    set: function (value) { this._ngForTrackBy = value; },
                    enumerable: true,
                    configurable: true
                });
                NgFor.prototype.ngDoCheck = function () {
                    if (lang_1.isPresent(this._differ)) {
                        var changes = this._differ.diff(this._ngForOf);
                        if (lang_1.isPresent(changes))
                            this._applyChanges(changes);
                    }
                };
                NgFor.prototype._applyChanges = function (changes) {
                    var _this = this;
                    // TODO(rado): check if change detection can produce a change record that is
                    // easier to consume than current.
                    var recordViewTuples = [];
                    changes.forEachRemovedItem(function (removedRecord) {
                        return recordViewTuples.push(new RecordViewTuple(removedRecord, null));
                    });
                    changes.forEachMovedItem(function (movedRecord) {
                        return recordViewTuples.push(new RecordViewTuple(movedRecord, null));
                    });
                    var insertTuples = this._bulkRemove(recordViewTuples);
                    changes.forEachAddedItem(function (addedRecord) {
                        return insertTuples.push(new RecordViewTuple(addedRecord, null));
                    });
                    this._bulkInsert(insertTuples);
                    for (var i = 0; i < insertTuples.length; i++) {
                        this._perViewChange(insertTuples[i].view, insertTuples[i].record);
                    }
                    for (var i = 0, ilen = this._viewContainer.length; i < ilen; i++) {
                        var viewRef = this._viewContainer.get(i);
                        viewRef.setLocal('last', i === ilen - 1);
                    }
                    changes.forEachIdentityChange(function (record) {
                        var viewRef = _this._viewContainer.get(record.currentIndex);
                        viewRef.setLocal('\$implicit', record.item);
                    });
                };
                NgFor.prototype._perViewChange = function (view, record) {
                    view.setLocal('\$implicit', record.item);
                    view.setLocal('index', record.currentIndex);
                    view.setLocal('even', (record.currentIndex % 2 == 0));
                    view.setLocal('odd', (record.currentIndex % 2 == 1));
                };
                NgFor.prototype._bulkRemove = function (tuples) {
                    tuples.sort(function (a, b) {
                        return a.record.previousIndex - b.record.previousIndex;
                    });
                    var movedTuples = [];
                    for (var i = tuples.length - 1; i >= 0; i--) {
                        var tuple = tuples[i];
                        // separate moved views from removed views.
                        if (lang_1.isPresent(tuple.record.currentIndex)) {
                            tuple.view = this._viewContainer.detach(tuple.record.previousIndex);
                            movedTuples.push(tuple);
                        }
                        else {
                            this._viewContainer.remove(tuple.record.previousIndex);
                        }
                    }
                    return movedTuples;
                };
                NgFor.prototype._bulkInsert = function (tuples) {
                    tuples.sort(function (a, b) { return a.record.currentIndex - b.record.currentIndex; });
                    for (var i = 0; i < tuples.length; i++) {
                        var tuple = tuples[i];
                        if (lang_1.isPresent(tuple.view)) {
                            this._viewContainer.insert(tuple.view, tuple.record.currentIndex);
                        }
                        else {
                            tuple.view =
                                this._viewContainer.createEmbeddedView(this._templateRef, tuple.record.currentIndex);
                        }
                    }
                    return tuples;
                };
                NgFor = __decorate([
                    core_1.Directive({ selector: '[ngFor][ngForOf]', inputs: ['ngForTrackBy', 'ngForOf', 'ngForTemplate'] }), 
                    __metadata('design:paramtypes', [core_1.ViewContainerRef, core_1.TemplateRef, core_1.IterableDiffers, core_1.ChangeDetectorRef])
                ], NgFor);
                return NgFor;
            }());
            exports_1("NgFor", NgFor);
            RecordViewTuple = (function () {
                function RecordViewTuple(record, view) {
                    this.record = record;
                    this.view = view;
                }
                return RecordViewTuple;
            }());
        }
    }
});
//# sourceMappingURL=ng_for.js.map