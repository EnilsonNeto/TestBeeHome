import { Component, OnInit, EventEmitter } from '@angular/core';
import { GeneratedPasswordResponse, GeneratePasswordRequest } from '../../../shared/models/password.model';
import { PasswordService } from '../../../shared/services/passwordService/password.service';
import { AlertService } from '../../../shared/services/alertService/alert.service';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-password-generator',
  templateUrl: './password-generator.component.html',
  styleUrls: ['./password-generator.component.css']
})
export class PasswordGeneratorComponent implements OnInit {
  passwordLength: number = 4;
  includeUppercase: boolean = false;
  includeLowercase: boolean = false;
  includeNumbers: boolean = false;
  includeSpecialChars: boolean = false;
  
  generatedPassword: string | null = null;
  passwordHistory: any;
  passwordHistoryUpdated = new EventEmitter<any[]>();

  showPassword: boolean = true;

  constructor(private passwordService: PasswordService, private alertService: AlertService) {}

  ngOnInit() {
    this.loadPasswordHistory();
  }

  onPasswordLengthChange(event: any) {
    if (typeof event === 'object' && 'value' in event) {
      this.passwordLength = Math.max(4, event.value);
    } else if (typeof event === 'number') {
      this.passwordLength = Math.max(4, event);
    }
  }

  loadPasswordHistory() {
    this.passwordService.getPasswordHistory().subscribe({
      next: (data) => {
        this.passwordHistory = data;
        this.sortPasswordHistory();
        this.passwordHistoryUpdated.emit([...this.passwordHistory]);
      },
      error: (error) => {
        console.error('Erro ao carregar o histórico de senhas:', error);
      }
    });
  }

  sortPasswordHistory() {
    this.passwordHistory.sort((a: { generatedAt: string | number | Date }, b: { generatedAt: string | number | Date }) => 
      new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime()
    );
  }

  onGeneratePassword() {
    if (this.passwordLength < 4) {
      this.alertService.showAlert('warning', 'O comprimento da senha deve ser de pelo menos 4 caracteres.');
      return;
    }

    const request: GeneratePasswordRequest = {
      length: this.passwordLength,
      includeUppercase: this.includeUppercase,
      includeLowercase: this.includeLowercase,
      includeNumbers: this.includeNumbers,
      includeSpecialChars: this.includeSpecialChars
    };

    this.passwordService.generatePassword(request).subscribe({
      next: (response: GeneratedPasswordResponse) => {
        this.generatedPassword = response.password;
        const newPasswordEntry = {
          password: response.password,
          generatedAt: new Date().toISOString()
        };

        this.passwordHistory.push(newPasswordEntry);
        this.sortPasswordHistory(); 
        this.passwordHistoryUpdated.emit([...this.passwordHistory]);

        this.alertService.showAlert('success', 'Senha gerada com sucesso!');
      },
      error: (error) => {
        console.error('Erro ao gerar a senha:', error);
        this.alertService.showAlert('error', 'Ocorreu um erro ao gerar a senha. Por favor selecione quais tipos de variaveis você deseja na sua senha.');
      }
    });
  }

  copyPassword() {
    const textarea = document.createElement('textarea');
    textarea.value = this.generatedPassword || '';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    this.alertService.showAlert('success', 'Senha copiada para área de transferência');
}


  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
