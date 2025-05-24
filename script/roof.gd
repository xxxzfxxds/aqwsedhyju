extends Area2D

@onready var roof = $map/TileMapLayer3

func _on_body_entered(body: Node2D) -> void:
	if body.name == 'Player':
		Global.roof = 1
	pass # Replace with function body.

func _on_body_exited(body: Node2D) -> void:
	if body.name == 'Player':
		Global.roof = 0
	pass # Replace with function body.
