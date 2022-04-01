import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'phonenumber' })
export class PhoneNumberPipe implements PipeTransform {
  UNICODE_DIGITS = /[\uFF10-\uFF19\u0660-\u0669\u06F0-\u06F9]/g;
  VALID_ALPHA_PATTERN = /[a-zA-Z]/g;
  LEADING_PLUS_CHARS_PATTERN = /^[+\uFF0B]+/g;
  NON_DIALABLE_CHARS = /[^,#+\*\d]/g;

  formatPhone(phone: string) {
    return (
      '(' + phone.slice(0, 3) + ') ' + phone.slice(3, 6) + '-' + phone.slice(6)
    );
  }

  transform(phone: string) {
    phone = phone.replace(this.UNICODE_DIGITS, function (ch) {
      return String.fromCharCode(48 + (ch.charCodeAt(0) & 0xf));
    });

    phone = phone.replace(this.LEADING_PLUS_CHARS_PATTERN, '+');
    phone = phone.replace(this.NON_DIALABLE_CHARS, '');

    if (phone.length === 10) {
      return this.formatPhone(phone);
    } else if (phone.length === 11 && phone.charAt(0) === '1') {
      return this.formatPhone(phone.slice(1));
    } else {
      return this.formatPhone(phone.slice(0, 10)) + ' x' + phone.slice(10);
    }
  }
}
