

(function($){

ShowedDataSelectorModifier = {
	order: 'current',
	page: 'current',
	search: 'applied',
}

GroupedColumnsOrderDir = 'asc';


/*
 * columnsForGrouping: array of DTAPI:cell-selector for columns for which rows grouping is applied
 */
var RowsGroup = function ( dt, columnsForGrouping )
{
	this.table = dt.table();
	this.columnsForGrouping = columnsForGrouping;
	 // set to True when new reorder is applied by RowsGroup to prevent order() looping
	this.orderOverrideNow = false;
	this.order = []
	
	self = this;
	$(document).on('order.dt', function ( e, settings) {
		if (!self.orderOverrideNow) {
			self._updateOrderAndDraw()
		}
		self.orderOverrideNow = false;
	})
	
	$(document).on('draw.dt', function ( e, settings) {
		self._mergeCells()
	})

	this._updateOrderAndDraw();
};


RowsGroup.prototype = {
	_getOrderWithGroupColumns: function (order, groupedColumnsOrderDir)
	{
		if (groupedColumnsOrderDir === undefined)
			groupedColumnsOrderDir = GroupedColumnsOrderDir
			
		var self = this;
		var groupedColumnsIndexes = this.columnsForGrouping.map(function(columnSelector){
			return self.table.column(columnSelector).index()
		})
		var groupedColumnsKnownOrder = order.filter(function(columnOrder){
			return groupedColumnsIndexes.indexOf(columnOrder[0]) >= 0
		})
		var nongroupedColumnsOrder = order.filter(function(columnOrder){
			return groupedColumnsIndexes.indexOf(columnOrder[0]) < 0
		})
		var groupedColumnsKnownOrderIndexes = groupedColumnsKnownOrder.map(function(columnOrder){
			return columnOrder[0]
		})
		var groupedColumnsOrder = groupedColumnsIndexes.map(function(iColumn){
			var iInOrderIndexes = groupedColumnsKnownOrderIndexes.indexOf(iColumn)
			if (iInOrderIndexes >= 0)
				return [iColumn, groupedColumnsKnownOrder[iInOrderIndexes][1]]
			else
				return [iColumn, groupedColumnsOrderDir]
		})
		
		groupedColumnsOrder.push.apply(groupedColumnsOrder, nongroupedColumnsOrder)
		return groupedColumnsOrder;
	},
 
	// Workaround: the DT reset ordering to 'asc' from multi-ordering if user order on one column (without shift)
	//   but because we always has multi-ordering due to grouped rows this happens every time
	_getInjectedMonoSelectWorkaround: function(order)
	{
		if (order.length === 1) {
			// got mono order - workaround here
			var orderingColumn = order[0][0]
			var previousOrder = this.order.map(function(val){
				return val[0]
			})
			var iColumn = previousOrder.indexOf(orderingColumn);
			if (iColumn >= 0) {
				// assume change the direction, because we already has that in previos order
				return [[orderingColumn, this._toogleDirection(this.order[iColumn][1])]]
			} // else This is the new ordering column. Proceed as is.
		} // else got milti order - work normal
		return order;
	},
	
	_mergeCells: function()
	{
		var columnsIndexes = this.table.columns(this.columnsForGrouping, ShowedDataSelectorModifier).indexes().toArray()
		var showedRowsCount = this.table.rows(ShowedDataSelectorModifier)[0].length 
		this._mergeColumn(0, showedRowsCount - 1, columnsIndexes)
	},
	
	// the index is relative to the showed data
	//    (selector-modifier = {order: 'current', page: 'current', search: 'applied'}) index
	_mergeColumn: function(iStartRow, iFinishRow, columnsIndexes)
	{
		var columnsIndexesCopy = columnsIndexes.slice()
		currentColumn = columnsIndexesCopy.shift()
		currentColumn = this.table.column(currentColumn, ShowedDataSelectorModifier)
		
		var columnNodes = currentColumn.nodes()
		var columnValues = currentColumn.data()
		
		var newSequenceRow = iStartRow,
			iRow;
		for (iRow = iStartRow + 1; iRow <= iFinishRow; ++iRow) {
			
			if (columnValues[iRow] === columnValues[newSequenceRow]) {
				$(columnNodes[iRow]).hide()
			} else {
				$(columnNodes[newSequenceRow]).show()
				$(columnNodes[newSequenceRow]).attr('rowspan', (iRow-1) - newSequenceRow + 1)
				
				if (columnsIndexesCopy.length > 0)
					this._mergeColumn(newSequenceRow, (iRow-1), columnsIndexesCopy)
				
				newSequenceRow = iRow;
			}
			
		}
		$(columnNodes[newSequenceRow]).show()
		$(columnNodes[newSequenceRow]).attr('rowspan', (iRow-1)- newSequenceRow + 1)
		if (columnsIndexesCopy.length > 0)
			this._mergeColumn(newSequenceRow, (iRow-1), columnsIndexesCopy)
	},
	
	_toogleDirection: function(dir)
	{
		return dir == 'asc'? 'desc': 'asc';
	},
 
	_updateOrderAndDraw: function()
	{
		this.orderOverrideNow = true;
		
		var currentOrder = this.table.order();
		currentOrder = this._getInjectedMonoSelectWorkaround(currentOrder);
		this.order = this._getOrderWithGroupColumns(currentOrder)
		this.table.order($.extend(true, Array(), this.order))
		this.table.draw()
	},
};


$.fn.dataTable.RowsGroup = RowsGroup;
$.fn.DataTable.RowsGroup = RowsGroup;

// Automatic initialisation listener
$(document).on( 'init.dt', function ( e, settings ) {
	if ( e.namespace !== 'dt' ) {
		return;
	}

	var api = new $.fn.dataTable.Api( settings );

	if ( settings.oInit.rowsGroup ||
		 $.fn.dataTable.defaults.rowsGroup )
	{
		options = settings.oInit.rowsGroup?
			settings.oInit.rowsGroup:
			$.fn.dataTable.defaults.rowsGroup;
		new RowsGroup( api, options );
	}
} );

}(jQuery));

/*

TODO: Provide function which determines the all <tr>s and <td>s with "rowspan" html-attribute is parent (groupped) for the specified <tr> or <td>. To use in selections, editing or hover styles.

TODO: Feature
Use saved order direction for grouped columns
	Split the columns into grouped and ungrouped.
	
	user = grouped+ungrouped
	grouped = grouped
	saved = grouped+ungrouped
	
	For grouped uses following order: user -> saved (because 'saved' include 'grouped' after first initialisation). This should be done with saving order like for 'groupedColumns'
	For ungrouped: uses only 'user' input ordering
*/