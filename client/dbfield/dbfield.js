Template.dbfield.events({
	'dblclick .efield':function(evt){
		evt.stopPropagation();		
		evt.preventDefault();
		Session.set('editing_field',this._id);	
	}
});
Template.editfield.positions = function(){
	return Position.find();
};
Template.editfield.rendered = function(){
    var fieldsel = $('.editfieldname');
        fieldsel.select();
        fieldsel.focus();
		var dbfield = Dbfield.findOne({_id:Session.get('editing_field')});
		$('.fieldtype').val(dbfield.fieldtype);
		
};
Template.editfield.events({
	'click .icon-pencil':function(){
		Session.set('showFieldInfo',true);
	},
	'keyup .editfieldname':function(evt,tmpl){
		evt.stopPropagation();
		evt.preventDefault();
		if(evt.which === 13){
			Dbfield.update(this._id,{$set:{name:tmpl.find('.editfieldname').value}});
			Session.set('editing_field',null);
		}
	},
	'change .fieldtype':function(evt,tmpl){
		if(tmpl.find('.fieldtype').value === 'remove'){
			Dbfield.remove({_id:this._id});
		}else{
				Dbfield.update(this._id,{$set:{name:tmpl.find('.editfieldname').value,fieldtype:tmpl.find('.fieldtype').value}});
				Session.set('editing_field',null);	
		}
	
	}
});
