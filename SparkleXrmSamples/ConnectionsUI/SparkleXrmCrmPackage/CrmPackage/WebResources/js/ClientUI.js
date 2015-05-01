// ClientUI.js
(function($){
Type.registerNamespace('ClientUI');ResourceStrings=function(){}
Type.registerNamespace('ClientUI.View.GridPlugins');ClientUI.View.GridPlugins.RowHoverPlugin=function(containerDivId){this.$2=containerDivId;}
ClientUI.View.GridPlugins.RowHoverPlugin.prototype={$0:null,$1:null,$2:null,$3:false,destroy:function(){this.$1.remove();},init:function(grid){this.$0=grid;this.$1=$('#'+this.$2);this.$1.mouseenter(ss.Delegate.create(this,function($p1_0){
this.$3=false;}));$('#grid').find('.slick-viewport').append(this.$1);(this.$0.onMouseEnter).subscribe(ss.Delegate.create(this,this.handleMouseEnter));(this.$0.onMouseLeave).subscribe(ss.Delegate.create(this,this.handleMouseLeave));},handleMouseLeave:function(e,item){this.$3=true;window.setTimeout(ss.Delegate.create(this,function(){
if(this.$3){this.$1.fadeOut();}}),500);},handleMouseEnter:function(e,item){var $0=this.$0.getCellFromEvent(e);if($0!=null){this.$3=false;var $1=this.$0.getDataItem($0.row);if($1!=null){this.$0.getGridPosition();var $2=this.$0.getViewport().rightPx;var $3=this.$0.getViewport().leftPx;var $4=$(this.$0.getCellNode($0.row,$0.cell));var $5=this.$1.width();var $6=$4.parent().width();if($2<$6+$5){$6=$2-$5;}var $7=0;$4.parent().append(this.$1);this.$1.css('left',$6.toString()+'px');this.$1.css('top',$7.toString()+'px');this.$1.css('display','block');this.$1.attr('rowId',$1.id);}}}}
Type.registerNamespace('ClientUI.Model');ClientUI.Model.Connection=function(){ClientUI.Model.Connection.initializeBase(this,['connection']);}
ClientUI.Model.Connection.prototype={connectionid:null,record1id:null,record2id:null,record1roleid:null,record2roleid:null}
Type.registerNamespace('ClientUI.ViewModel');ClientUI.ViewModel.ConnectionsViewModel=function(parentRecordId,connectToTypes){this.Connections=new SparkleXrm.GridEditor.EntityDataViewModel(2,ClientUI.Model.Connection,true);this.SelectedConnection=ko.observable();this.ErrorMessage=ko.observable();this.AllowAddNew=ko.observable(true);ClientUI.ViewModel.ConnectionsViewModel.initializeBase(this);this.$1_0=parentRecordId;var $0=new ClientUI.ViewModel.ObservableConnection(connectToTypes);$0.record2id(this.$1_0);this.ConnectionEdit=ko.validatedObservable($0);this.Connections.onDataLoaded.subscribe(ss.Delegate.create(this,this.$1_1));this.ConnectionEdit().add_onSaveComplete(ss.Delegate.create(this,this.$1_3));ClientUI.ViewModel.ObservableConnection.registerValidation(this.Connections.validationBinder);}
ClientUI.ViewModel.ConnectionsViewModel.prototype={ConnectionEdit:null,$1_0:null,$1_1:function($p0,$p1){var $0=$p1;for(var $1=0;$1<$0.to;$1++){var $2=this.Connections.getItem($1);if($2==null){return;}$2.add_propertyChanged(ss.Delegate.create(this,this.$1_2));}},$1_2:function($p0,$p1){if($p1.propertyName==='record1roleid'){var $0=$p0;var $1=new ClientUI.Model.Connection();$1.connectionid=new Xrm.Sdk.Guid($0.id);$1.record1roleid=$0.record1roleid;Xrm.Sdk.OrganizationServiceProxy.beginUpdate($1,ss.Delegate.create(this,function($p1_0){
try{Xrm.Sdk.OrganizationServiceProxy.endUpdate($p1_0);}catch($1_0){this.ErrorMessage($1_0.message);}}));}},$1_3:function($p0){if($p0==null){this.Connections.reset();this.Connections.refresh();}this.ErrorMessage($p0);},search:function(){this.Connections.set_fetchXml("<fetch version='1.0' output-format='xml-platform' mapping='logical' returntotalrecordcount='true' no-lock='true' distinct='false' count='{0}' paging-cookie='{1}' page='{2}'>\r\n                                  <entity name='connection'>\r\n                                    <attribute name='record2id' />\r\n                                    <attribute name='record2roleid' />\r\n                                    <attribute name='record1id' />\r\n                                    <attribute name='record1roleid' />\r\n                                    <attribute name='connectionid' />\r\n                                    <filter type='and'>\r\n                                      \r\n                                      <condition attribute='record2id' operator='eq' value='"+this.$1_0.id.toString().replaceAll('{','').replaceAll('}','')+"' />\r\n                                    </filter>\r\n                                  {3}\r\n                                  </entity>\r\n                                </fetch>");this.Connections.refresh();},RoleSearchCommand:function(term,callback){ClientUI.ViewModel.ObservableConnection.RoleSearch(term,callback,this.SelectedConnection().record1id.logicalName);},AddNewCommand:function(){this.ErrorMessage(null);this.ConnectionEdit().AddNewVisible(true);},OpenAssociatedSubGridCommand:function(){var $0=window.parent.Xrm.Page.ui.navigation.items.get('navConnections');$0.setFocus();},DeleteSelectedCommand:function(){var $0=SparkleXrm.GridEditor.DataViewBase.rangesToRows(this.Connections.getSelectedRows());if(!$0.length){return;}Xrm.Utility.confirmDialog(String.format(ResourceStrings.ConfirmDeleteSelectedConnection,$0.length),ss.Delegate.create(this,function(){
var $1_0=[];var $enum1=ss.IEnumerator.getEnumerator($0);while($enum1.moveNext()){var $1_1=$enum1.current;$1_0.add(this.Connections.getItem($1_1));}try{var $enum2=ss.IEnumerator.getEnumerator($1_0);while($enum2.moveNext()){var $1_2=$enum2.current;Xrm.Sdk.OrganizationServiceProxy.delete_($1_2.logicalName,new Xrm.Sdk.Guid($1_2.id));}}catch($1_3){this.ErrorMessage($1_3.toString());}this.Connections.raiseOnSelectedRowsChanged(null);this.Connections.reset();this.Connections.refresh();}),null);},DeleteCommand:function(data,e){Xrm.Utility.confirmDialog(ResourceStrings.ConfirmDeleteConnection,ss.Delegate.create(this,function(){
var $1_0=e.target.parentNode.getAttribute('rowId').toString();Xrm.Sdk.OrganizationServiceProxy.beginDelete(ClientUI.Model.Connection.logicalName,new Xrm.Sdk.Guid($1_0),ss.Delegate.create(this,function($p2_0){
try{Xrm.Sdk.OrganizationServiceProxy.endDelete($p2_0);var $enum1=ss.IEnumerator.getEnumerator(this.Connections.get_data());while($enum1.moveNext()){var $2_0=$enum1.current;if($2_0.id===$1_0){this.Connections.removeItem($2_0);break;}}this.Connections.refresh();}catch($2_1){this.ErrorMessage($2_1.message);}}));}),null);}}
ClientUI.ViewModel.ObservableConnection=function(types){this.AddNewVisible=ko.observable(false);this.connectiondid=ko.observable();this.record1id=ko.observable();this.record2id=ko.observable();this.record1roleid=ko.observable();this.record2roleid=ko.observable();ClientUI.ViewModel.ObservableConnection.initializeBase(this);this.$1_1=types;ClientUI.ViewModel.ObservableConnection.registerValidation(new SparkleXrm.ObservableValidationBinder(this));}
ClientUI.ViewModel.ObservableConnection.RoleSearch=function(term,callback,typeName){var $0='';if(typeName!=null){var $2=Mscrm.EntityPropUtil.EntityTypeName2CodeMap[typeName];$0=String.format("\r\n                                        <filter>\r\n                                            <condition attribute='associatedobjecttypecode' operator='eq' value='{0}' />\r\n                                        </filter>",$2);}var $1="\r\n                            <fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false' no-lock='true' >\r\n                                <entity name='connectionrole' >\r\n                                    <attribute name='category' />\r\n                                    <attribute name='name' />\r\n                                    <attribute name='connectionroleid' />\r\n                                    <attribute name='statecode' />\r\n                                    <order attribute='name' descending='false' />\r\n                                    <link-entity name='connectionroleobjecttypecode' from='connectionroleid' to='connectionroleid' >\r\n                                    {1}\r\n                                    </link-entity>\r\n                                    <filter>\r\n                                        <condition attribute='name' operator='like' value='%{0}%' />\r\n                                    </filter>\r\n                                </entity>\r\n                            </fetch>";$1=String.format($1,Xrm.Sdk.XmlHelper.encode(term),$0);Xrm.Sdk.OrganizationServiceProxy.beginRetrieveMultiple($1,function($p1_0){
var $1_0=Xrm.Sdk.OrganizationServiceProxy.endRetrieveMultiple($p1_0,Xrm.Sdk.Entity);callback($1_0);});}
ClientUI.ViewModel.ObservableConnection.validateRecord1Id=function(rules,viewModel,dataContext){return rules.addRule(ResourceStrings.RequiredMessage,function($p1_0){
return ($p1_0!=null)&&($p1_0).id!=null;});}
ClientUI.ViewModel.ObservableConnection.validateRecord1RoleId=function(rules,viewModel,dataContext){return rules.addRule(ResourceStrings.RequiredMessage,function($p1_0){
return ($p1_0!=null)&&($p1_0).id!=null;});}
ClientUI.ViewModel.ObservableConnection.registerValidation=function(binder){binder.register('record1id',ClientUI.ViewModel.ObservableConnection.validateRecord1Id);binder.register('record1roleid',ClientUI.ViewModel.ObservableConnection.validateRecord1RoleId);}
ClientUI.ViewModel.ObservableConnection.prototype={add_onSaveComplete:function(value){this.$1_0=ss.Delegate.combine(this.$1_0,value);},remove_onSaveComplete:function(value){this.$1_0=ss.Delegate.remove(this.$1_0,value);},$1_0:null,$1_1:null,RecordSearchCommand:function(term,callback){var $0=0;var $1=[];var $2=ss.Delegate.create(this,function($p1_0){
$0++;$1.addRange($p1_0.get_entities().items());$1.sort(function($p2_0,$p2_1){
return String.compare($p2_0.getAttributeValueString('name'),$p2_1.getAttributeValueString('name'));});if($0===Object.getKeyCount(this.$1_1)){var $1_0=new Xrm.Sdk.EntityCollection($1);callback($1_0);}});var $enum1=ss.IEnumerator.getEnumerator(Object.keys(this.$1_1));while($enum1.moveNext()){var $3=$enum1.current;this.$1_2(term,$2,$3,this.$1_1[$3]);}},$1_2:function($p0,$p1,$p2,$p3){var $0="<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false' no-lock='true' count='25'>\r\n                              <entity name='{1}'>\r\n                                <attribute name='{2}' alias='name' />\r\n                                <order attribute='{2}' descending='false' />\r\n                                <filter type='and'>\r\n                                  <condition attribute='{2}' operator='like' value='%{0}%' />\r\n                                </filter>\r\n                              </entity>\r\n                            </fetch>";$0=String.format($0,Xrm.Sdk.XmlHelper.encode($p0),$p2,$p3);Xrm.Sdk.OrganizationServiceProxy.beginRetrieveMultiple($0,function($p1_0){
var $1_0=Xrm.Sdk.OrganizationServiceProxy.endRetrieveMultiple($p1_0,Xrm.Sdk.Entity);$p1($1_0);});},RoleSearchCommand:function(term,callback){var $0=this.record1id();ClientUI.ViewModel.ObservableConnection.RoleSearch(term,callback,($0!=null)?$0.logicalName:null);},SaveCommand:function(){if(!(this).isValid()){(this).errors.showAllMessages(true);return;}this.isBusy(true);this.AddNewVisible(false);var $0=new ClientUI.Model.Connection();$0.record1id=this.record1id();$0.record2id=this.record2id();$0.record1roleid=this.record1roleid();$0.record2roleid=this.record2roleid();Xrm.Sdk.OrganizationServiceProxy.beginCreate($0,ss.Delegate.create(this,function($p1_0){
try{this.connectiondid(Xrm.Sdk.OrganizationServiceProxy.endCreate($p1_0));this.$1_0(null);this.record1id(null);this.record1roleid(null);(this).errors.showAllMessages(false);}catch($1_0){this.$1_0($1_0.message);}finally{this.isBusy(false);}}));},CancelCommand:function(){this.AddNewVisible(false);}}
Type.registerNamespace('ClientUI.View');ClientUI.View.ConnectionsView=function(){}
ClientUI.View.ConnectionsView.Init=function(){Xrm.PageEx.majorVersion=2013;var $0=Xrm.Sdk.OrganizationServiceProxy.getUserSettings().uilanguageid;SparkleXrm.LocalisedContentLoader.fallBackLCID=0;SparkleXrm.LocalisedContentLoader.supportedLCIDs.add(1033);SparkleXrm.LocalisedContentLoader.supportedLCIDs.add(1031);SparkleXrm.LocalisedContentLoader.loadContent('con_/js/Res.metadata.js',$0,function(){
ClientUI.View.ConnectionsView.$1();});}
ClientUI.View.ConnectionsView.$1=function(){var $0;var $1;var $2;$0=Xrm.PageEx.getWebResourceData();$1=window.parent.Xrm.Page.data.entity.getId();$2=window.parent.Xrm.Page.data.entity.getEntityName();var $3=new Xrm.Sdk.EntityReference(new Xrm.Sdk.Guid($1),$2,null);ClientUI.View.ConnectionsView.vm=new ClientUI.ViewModel.ConnectionsViewModel($3,$0);var $4=new SparkleXrm.GridEditor.GridDataViewBinder();var $5=SparkleXrm.GridEditor.GridDataViewBinder.parseLayout(String.format('{0},record1id,250,{1},record1roleid,250',ResourceStrings.ConnectTo,ResourceStrings.Role));SparkleXrm.GridEditor.XrmLookupEditor.bindColumn($5[1],ss.Delegate.create(ClientUI.View.ConnectionsView.vm,ClientUI.View.ConnectionsView.vm.RoleSearchCommand),'connectionroleid','name','');ClientUI.View.ConnectionsView.$0=$4.dataBindXrmGrid(ClientUI.View.ConnectionsView.vm.Connections,$5,'container','pager',true,false);ClientUI.View.ConnectionsView.$0.onActiveCellChanged.subscribe(function($p1_0,$p1_1){
var $1_0=$p1_1;ClientUI.View.ConnectionsView.vm.SelectedConnection(ClientUI.View.ConnectionsView.$0.getDataItem($1_0.row));});SparkleXrm.ViewBase.registerViewModel(ClientUI.View.ConnectionsView.vm);ClientUI.View.ConnectionsView.$2();$(window).resize(ClientUI.View.ConnectionsView.$3);$(function(){
ClientUI.View.ConnectionsView.$3(null);ClientUI.View.ConnectionsView.vm.search();});}
ClientUI.View.ConnectionsView.$2=function(){var $0=Xrm.Sdk.Metadata.MetadataCache.getSmallIconUrl;var $1=function($p1_0){
switch($p1_0){case 'connectionrole':return '/_imgs/ico_16_3234.gif';default:return $0($p1_0);}};Xrm.Sdk.Metadata.MetadataCache.getSmallIconUrl=$1;}
ClientUI.View.ConnectionsView.$3=function($p0){var $0=$(window).height();var $1=$(window).width();$('#container').height($0-64).width($1-1);ClientUI.View.ConnectionsView.$0.resizeCanvas();}
ResourceStrings.registerClass('ResourceStrings');ClientUI.View.GridPlugins.RowHoverPlugin.registerClass('ClientUI.View.GridPlugins.RowHoverPlugin',null,Object);ClientUI.Model.Connection.registerClass('ClientUI.Model.Connection',Xrm.Sdk.Entity);ClientUI.ViewModel.ConnectionsViewModel.registerClass('ClientUI.ViewModel.ConnectionsViewModel',SparkleXrm.ViewModelBase);ClientUI.ViewModel.ObservableConnection.registerClass('ClientUI.ViewModel.ObservableConnection',SparkleXrm.ViewModelBase);ClientUI.View.ConnectionsView.registerClass('ClientUI.View.ConnectionsView');ResourceStrings.ConfirmDeleteSelectedConnection=null;ResourceStrings.ConfirmDeleteConnection=null;ResourceStrings.RequiredMessage=null;ResourceStrings.SaveButton=null;ResourceStrings.CancelButton=null;ResourceStrings.Connection_CollectionName=null;ResourceStrings.ConnectTo=null;ResourceStrings.Role=null;ClientUI.Model.Connection.logicalName='connection';ClientUI.View.ConnectionsView.vm=null;ClientUI.View.ConnectionsView.$0=null;})(window.xrmjQuery);