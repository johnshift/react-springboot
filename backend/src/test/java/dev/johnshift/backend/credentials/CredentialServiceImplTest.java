package dev.johnshift.backend.credentials;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import dev.johnshift.backend.credential.Credential;
import dev.johnshift.backend.credential.CredentialRepository;
import dev.johnshift.backend.credential.CredentialServiceImpl;
import dev.johnshift.backend.utils.Generator;

@ExtendWith(MockitoExtension.class)
public class CredentialServiceImplTest {

	@Mock
	CredentialRepository credentialRepository;

	@InjectMocks
	CredentialServiceImpl svc;

	static final Credential credential = Generator.credential();

	@Test
	public void get_password_using_nonExisting_principal_returns_null() {

		// mock non-existing principal
		String nonExistingPrincipal = Generator.randomString();
		when(credentialRepository.findOneByUsername(nonExistingPrincipal)).thenReturn(Optional.empty());
		when(credentialRepository.findOneByEmail(nonExistingPrincipal)).thenReturn(Optional.empty());

		// call service method
		String password = svc.getPasswordByPrincipalOrNull(nonExistingPrincipal);

		// assert
		assertEquals(null, password);
	}

	@Test
	public void get_password_using_existing_username_returns_credential() {

		// mock principal used (username)
		String principal = credential.getUsername();

		// mock get password using username principal
		when(credentialRepository.findOneByUsername(principal)).thenReturn(Optional.of(credential));

		// call service method
		String password = svc.getPasswordByPrincipalOrNull(principal);

		// assert
		assertEquals(credential.getPassword(), password);
	}

	@Test
	public void get_password_using_existing_email_returns_credential() {

		// mock principal used (username)
		String principal = credential.getEmail();

		// mock get password using username principal
		when(credentialRepository.findOneByUsername(principal)).thenReturn(Optional.empty());
		when(credentialRepository.findOneByEmail(principal)).thenReturn(Optional.of(credential));

		// call service method
		String password = svc.getPasswordByPrincipalOrNull(principal);

		// assert
		assertEquals(credential.getPassword(), password);
	}

}
