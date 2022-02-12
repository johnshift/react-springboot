package dev.johnshift.backend.domains.reqres;

import java.util.List;
import dev.johnshift.backend.domains.models.Mention;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreatePostRequest {
	private int userId;
	private String postBody;
	private boolean asVeil;
	private List<Mention> mentions;
}
