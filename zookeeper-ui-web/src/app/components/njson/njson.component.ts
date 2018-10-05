import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { ConfigApi } from '../../autogenerated/api/ConfigApi';
import { ChildrenNodes } from '../../autogenerated/model/ChildrenNodes';
import { Node } from '../../model/Node';
import { Json } from '../../model/Json';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NodeCreationModalComponent } from '../node-creation-modal/node-creation-modal.component';
import { FileUploadModalComponent, UploadOptions } from '../file-upload-modal/file-upload-modal.component';
import { NodeExport } from '../../autogenerated/model/NodeExport';
import { AlertList, Alert, AlertType} from '../alerts/alerts.component';
import { Server } from 'selenium-webdriver/safari';

@Component({
  selector: 'app-njson',
  templateUrl: './njson.component.html',
  styleUrls: ['./njson.component.css']
})
export class NjsonComponent implements OnInit {
  currentNode: Node;
  alerts: AlertList;
  modalRef: BsModalRef;
  currentNodeParents: Node[];
  loading: boolean;
  jsonvalue : NodeExport;
  respJson  : Object[];
  //respJson : Array<Json>;
  interface : Boolean;
  found_flg  : Boolean;


  constructor(private _configApi : ConfigApi,
              private modalService: BsModalService,
              private route: ActivatedRoute) {
    this.alerts = new AlertList();
    this.currentNodeParents = [];
  }

  ngOnInit() {
    this.loading = true;
    this.route.params.map(params => params['nodePath'])
      .subscribe((nodePath) => this.setCurrentNode(nodePath));
    this.interface = true;

  }

  setCurrentNode(nodePath: string): void {
    nodePath = '~~';
    this.currentNode = new Node(nodePath);
    this.currentNodeParents = this.currentNode.parents;
    this.reloadNodeChildren(this.currentNode);
 

    this._configApi.getNodeExport(this.currentNode.path).subscribe(
      exportData => {
        //console.log('Murali',JSON.stringify(exportData));
      
        this.jsonvalue =  exportData;
        var respJson = new Array();
        //this.respJson = new Array();
        console.log('this.jsonvalue',this.jsonvalue);
        var BreakException = {};

        exportData.children.forEach(function(staticObj) { console.log('staticObj.name', staticObj.name);
          staticObj.children.forEach(function(serverObj){  console.log('serverObj.name', serverObj.name);
            serverObj.children.forEach(function(clientNodObj) { console.log('clientNodObj.name', clientNodObj.name);
               // clientNodObj.children.forEach(function(applicationObj) { console.log('applicationObj.name', applicationObj.name);
                
                  if (staticObj.name == 'static')
                  {
                    console.log('Murali -----------STATIC');

                     exportData.children.forEach(function(staticObj1) {
                      staticObj1.children.forEach(function(serverObj1){ 
                        serverObj1.children.forEach(function(clientNodObj1) {
                           // clientNodObj1.children.forEach(function(applicationObj1) {
                              if (staticObj1.name == 'dynamic' && serverObj.name == serverObj1.name
                                  && clientNodObj.name == clientNodObj1.name
                                 ) 
                              {
                                console.log('Matched staticObj.name : ',staticObj.name,' serverObj.name :',serverObj.name,' clientNodObj.name', clientNodObj.name, ' clientNodObj.value', clientNodObj.value );
                                respJson.push  ({ 
                                  "type" : staticObj.name,
                                  "server" : serverObj.name,
                                  "client" : clientNodObj.name,
                                  "application" : clientNodObj.name ,
                                  "value" : JSON.parse(clientNodObj.value),
                                  //"dynvalue" : JSON.parse(clientNodObj1.value),
                                  "dynvalue" : JSON.parse(JSON.stringify(clientNodObj1.value) ),
                                  "dynstatus" : true
                                 });
                                 //this.found_flg = true;
                                 //throw BreakException;
                              }
                            //})
                          })
                        })
                      });    

                  }

        

                  


                    
                         //console.log('applicationObj.name',applicationObj.name);
                         //console.log('applicationObj.value',applicationObj.value);
                        /*Working*/
                        /*
                        var ss = { waitTime: 5, QueueId: [0], maxQueueSize : 2 };
                        var myJSON = JSON.stringify(ss);
                        console.log('myJSON',myJSON);
                        var test  = JSON.parse(myJSON);
                        console.log('test',test.waitTime); 
                        */

                       // var ss = applicationObj.value;
                       // var myJSON = JSON.stringify(ss,['waitTime','QueueId','maxQueueSize']);
                       // console.log('myJSON',myJSON);
                      //  var test  = JSON.parse(ss);
                        //console.log('test',test); 
  
                    

                    
               // })

            }) 


          })


        });
        exportData.children.forEach(function(staticObj) {
          staticObj.children.forEach(function(serverObj){ 
            serverObj.children.forEach(function(clientNodObj) {
              //  clientNodObj.children.forEach(function(applicationObj) {
                  let bool1 = 'false';
                  if( staticObj.name=='static')
                    {

                                  respJson.forEach(function (arrayItem) {
                                  var x = arrayItem.server;
                                  // console.log('value of x is ',x);
                                  console.log('arrayItem.server',arrayItem.server,'serverObj.name',serverObj.name,'arrayItem.client',arrayItem.client,'clientNodObj.name',clientNodObj.name);
                                  if ( arrayItem.server == serverObj.name && arrayItem.client ==  clientNodObj.name)
                                  {
                                    bool1 = 'true';

                                    console.log('Already added Server',serverObj.name  );
                                  }
                            
                                }
                                );

                        
                                console.log('------------------------');
                                if (bool1 == 'false')
                                { 
                                respJson.push  ({ 
                                  "type" : staticObj.name,
                                  "server" : serverObj.name,
                                  "client" : clientNodObj.name,
                                  "application" : clientNodObj.name ,
                                  "value" : JSON.parse(clientNodObj.value),
                                  "dynvalue" : '',
                                  "dynstatus" : false
                                });
                              }
                          }

                  //  })
                           
                    })
                  })
                })  ;
      

        this.respJson = respJson;

     


        this.alerts.addAlert({
          alertType: AlertType.Success,
          message: `Connected to Zookeeper and read Nodes successfully!`
        });
      },
      error => {
        this.alerts.addAlert(Alert.fromResponse(error));
      }
    );

  }

  reloadNodeChildren(node: Node, loadGrandChildren: boolean = true) {
    this.loading = true;
    this._configApi.getNodeChildren(node.path)
      .subscribe(
        childrenNodes => {
          this.loading = false;
          node.clearChildren();
          for (let childName of childrenNodes.children) {
            let childNode = node.addChildNode(childName);
            if (loadGrandChildren) {
              this.reloadNodeChildren(childNode, false);
            }
          }
        },
        error => {
          this.loading = false;
          this.alerts.addAlert(Alert.fromResponse(error));
        }
      );
  }

}


