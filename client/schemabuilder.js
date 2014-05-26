Template.main.events({
	'dblclick .schema':function(evt){
		evt.preventDefault();
		evt.stopPropagation();
		var id = Position.insert({name:'New Table Name',left:(evt.x + 280) + 'px',top:(evt.y) + 'px'});
		Session.set('editing_tablename',id);
	}
});
Template.main.editing_field = function(){
	return Session.get('editing_field');
};
Template.main.positions = function(){
	return Position.find();
};