extends Area2D

@onready var sprite = $plant

func _on_body_entered(body: Node2D) -> void:
	if body.name == "Player":
		if sprite.get_frame() == 4:
			Global.tomat+=1
			print('+tomato')
			sprite.play('0')
		else:
			if Global.seedsTomat!=0:
				Global.seedsTomat-=1
				sprite.play('tomato')
	pass # Replace with function body.
