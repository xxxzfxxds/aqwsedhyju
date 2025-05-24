extends Area2D

func _on_body_entered(body: Node2D) -> void:
	if body.name == 'Player':
		if Global.maney >= 5:
			Global.seedsTomat += 1
			Global.maney -= 5
	pass # Replace with function body.
