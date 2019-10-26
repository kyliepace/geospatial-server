const turf = require('@turf/turf');

/**
*	Function that cuts a {@link Polygon} with a {@link Linestring}
* @param {Feature<(Polygon)>} poly - single Polygon Feature
* @param {Feature<(Polyline)>} line - single Polyline Feature
* @return {FeatureCollection<(Polygon)>}
* @author	Abel Vázquez
* @version 1.0.0
*/
module.exports = function(poly, line){
	if (poly.geometry === void 0 || poly.geometry.type !== 'Polygon' ) throw('"turf-cut" only accepts Polygon type as victim input');
	if (line.geometry === void 0 || line.geometry.type !== 'LineString' ) throw('"turf-cut" only accepts LineString type as axe input');
	if(turf.inside(turf.point(line.geometry.coordinates[0]), poly) || turf.inside (turf.point(line.geometry.coordinates[line.geometry.coordinates.length-1]), poly)) throw('Both first and last points of the polyline must be outside of the polygon');

  var _axe = turf.buffer(line.geometry, 0.000000001, {units: 'meters'}); // {type: 'Feature', geometry: { type: 'Polygon', coordinates: [] }}
	var _body = turf.erase(poly, _axe),
		pieces = [];

	if (_body.geometry.type == 'Polygon' ){
		pieces.push( turf.pol(_body.geometry.coordinates));
	}else{
		_body.geometry.coordinates.forEach(function(a){pieces.push( pol(a))});
	}

	pieces.forEach(function(a){a.properties = poly.properties});

	return turf.fc(pieces);

}