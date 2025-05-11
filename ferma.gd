extends Area2D

@onready var sprite = $AnimatedSprite2D

func _on_body_entered(body: Node2D) -> void:
	if body.name == 'Player':
		if Input.is_action_pressed('pres'):
			sprite.play("ferm")
	pass # Replace with function body.
