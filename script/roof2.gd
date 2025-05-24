extends TileMapLayer

func _physics_process(delta: float) -> void:
	if Global.roof == 1:
		visible = false
	else:
		visible = true
	
