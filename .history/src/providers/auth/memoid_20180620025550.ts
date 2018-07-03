import { Injectable } from "@angular/core";

@Injectable()
export class MemoId {
    data = {
        memo: 0,
        user: 0
    }
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