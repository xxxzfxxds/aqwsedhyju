extends CharacterBody2D

@onready var sprite = $AnimatedSprite2D
var speed = 100

func _physics_process(delta: float) -> void:
	if Input.is_action_pressed('right'):
		velocity.x = speed
		sprite.play('run_right')
	elif Input.is_action_pressed('left'):
		velocity.x = -speed
		sprite.play('run_right')
	else:
		if Input.is_action_just_released('right'):
			velocity.x = 0
			sprite.play("idle_right")
		if Input.is_action_just_released('left'):
			velocity.x = 0
			sprite.play("idle_right")
	if Input.is_action_pressed('down'):
		velocity.y = speed
		sprite.play("run")
	elif Input.is_action_pressed('up'):
		velocity.y = -speed
		sprite.play("run_back")
	else:
		if Input.is_action_just_released('up'):
			velocity.y = 0
			sprite.play("idle_back")
		if Input.is_action_just_released('down'):
			velocity.y = 0
			sprite.play("idle")
	if velocity.x < 0: 
		sprite.flip_h = true 
	else: 
		false 
	if velocity.x > 0: 
		sprite.flip_h = false 
	else: 
		false
	move_and_slide()
