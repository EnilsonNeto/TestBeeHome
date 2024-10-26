// Crie uma nova classe DTO
package com.projectBeehome.gerador_senhas.model;

public class GeneratePasswordRequest {
    private int length;
    private boolean includeUppercase;
    private boolean includeLowercase;
    private boolean includeNumbers;
    private boolean includeSpecialChars;

    // Getters e Setters
    public int getLength() {
        return length;
    }

    public void setLength(int length) {
        this.length = length;
    }

    public boolean isIncludeUppercase() {
        return includeUppercase;
    }

    public void setIncludeUppercase(boolean includeUppercase) {
        this.includeUppercase = includeUppercase;
    }

    public boolean isIncludeLowercase() {
        return includeLowercase;
    }

    public void setIncludeLowercase(boolean includeLowercase) {
        this.includeLowercase = includeLowercase;
    }

    public boolean isIncludeNumbers() {
        return includeNumbers;
    }

    public void setIncludeNumbers(boolean includeNumbers) {
        this.includeNumbers = includeNumbers;
    }

    public boolean isIncludeSpecialChars() {
        return includeSpecialChars;
    }

    public void setIncludeSpecialChars(boolean includeSpecialChars) {
        this.includeSpecialChars = includeSpecialChars;
    }
}
