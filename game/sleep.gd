extends Area2D

@onready var panel = $Panel

func _on_body_entered(body: Node2D) -> void:
	if Input.is_action_pressed('sleep'):
		if body.name == "Player":
			panel.visible = !panel.visible
	pass # Replace with function body.
