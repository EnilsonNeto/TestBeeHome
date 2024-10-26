import { Component, OnInit } from '@angular/core';
import { PasswordService } from '../../../shared/services/password.service';
import { GeneratedPasswordResponse, GeneratePasswordRequest } from '../../../shared/models/password.model';

@Component({
  selector: 'app-password-generator',
  templateUrl: './password-generator.component.html',
  styleUrl: './password-generator.component.css'
})
export class PasswordGeneratorComponent implements OnInit {
  passwordLength: number = 0;
  includeUppercase: boolean = false;
  includeLowercase: boolean = false;
  includeNumbers: boolean = false;
  includeSpecialChars: boolean = false;

  generatedPassword: string | null = null;
  passwordHistory: any; 

  constructor(private passwordService: PasswordService) { }

  ngOnInit() {
    this.passwordService.getPasswordHistory().subscribe({
      next: (data) => {
        this.passwordHistory = data;
        this.sortPasswordHistory();
      },
      error: (error) => {
        console.error('Erro ao carregar o histórico de senhas:', error);
      }
    });
  }

  sortPasswordHistory() {
    this.passwordHistory.sort((a: { generatedAt: string | number | Date; }, b: { generatedAt: string | number | Date; }) => new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime());
  }
  onGeneratePassword() {
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
        this.passwordHistory.push({
          password: response.password,
          generatedAt: new Date().toISOString()
        });
        this.ngOnInit();
      },
      error: (error) => {
        console.error('Erro ao gerar a senha:', error);
        // Adicione mais informações, como a mensagem de erro
        if (error.error) {
            console.error('Mensagem do servidor:', error.error);
        }
    }
    });
  }
}

