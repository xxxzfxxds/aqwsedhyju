extends Area2D

func _on_body_entered(body: Node2D) -> void:
	if body.name == 'Player':
		Global.maney += 10*(Global.tomat+Global.wheat)
		Global.tomat = 0
		Global.wheat = 0
	pass # Replace with function body.
