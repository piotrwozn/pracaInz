package com.RPGTime.backendmysql.general.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserChangeDto {
    private String username;
    private String email;
    private String newPassword;
    private String oldPassword;
}
