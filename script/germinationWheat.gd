extends Area2D

@onready var sprite = $plantWheat

func _on_body_entered(body: Node2D) -> void:
	if body.name == "Player":
		if sprite.get_frame() == 4:
			Global.wheat+=1
			print('+wheat')
			sprite.play('0')
		else:
			if Global.seedsWheat!=0:
				Global.seedsWheat-=1
				sprite.play('wheat')
	pass # Replace with function body.
