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
  includeLowercase: boolean = true;
  includeNumbers: boolean = false;
  includeSpecialChars: boolean = false;

  generatedPassword: string | null = null;
  passwordHistory: any;
  passwordHistoryUpdated = new EventEmitter<any[]>();

  showPassword: boolean = true;
  passwordStrength: string = 'weak';

  constructor(private passwordService: PasswordService, private alertService: AlertService) { }

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
        this.updatePasswordHistory(response.password);
        this.alertService.showAlert('success', 'Senha gerada com sucesso!');
      },
      error: (error) => {
        console.error('Erro ao gerar a senha:', error);
        this.alertService.showAlert('error', 'Ocorreu um erro ao gerar a senha. Por favor selecione quais tipos de variáveis você deseja na sua senha.');
      }
    });
  }

  updatePasswordHistory(password: string) {
    const newPasswordEntry = { password, generatedAt: new Date().toISOString() };
    this.passwordHistory.push(newPasswordEntry);
    this.sortPasswordHistory();
    this.passwordHistoryUpdated.emit([...this.passwordHistory]);
    this.calculatePasswordStrength(password);
  }

  copyPassword() {
    navigator.clipboard.writeText(this.generatedPassword || '').then(() => {
      this.alertService.showAlert('success', 'Senha copiada para área de transferência');
    });
  }

  calculatePasswordStrength(password: string): void {
    const strengthPoints = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /[0-9]/.test(password),
      /[^A-Za-z0-9]/.test(password)
    ].filter(Boolean).length;

    this.passwordStrength = strengthPoints <= 2 ? 'weak' :
      strengthPoints === 3 || strengthPoints === 4 ? 'medium' : 'strong';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
