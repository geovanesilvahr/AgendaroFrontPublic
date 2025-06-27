import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'cpfMask'
})
export class CpfMaskPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;
    return value.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
}
