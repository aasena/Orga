import { Injectable } from "@angular/core";

@Injectable()
export class MemoId {
    
}

interface MemoId {
    content: string;
    form: string;
    href: string;
    $form: JQuery;
    $message: JQuery;
    $modal: JQuery;
    $submits: JQuery;
 }