export const PLATFORMER_TUTORIAL = {
  id: "platformer",
  title: "Simple Platformer",
  subtitle: "Jump, land, pretend gravity is your friend",
  roast: "Congrats on Level 2. Now make a rectangle jump. Peak game development.",
  time: "~25 min",
  goals: [
    "Create a CharacterBody2D player that runs and jumps",
    "Add a StaticBody2D floor so you stop falling forever",
    "Use delta-friendly movement and move_and_slide()",
    "Understand why _physics_process exists",
  ],
  steps: [
    {
      title: "1. New scene — the stage",
      body: "Create a new 2D scene. Add a Node2D root named Main. Save as main.tscn. This is your world container — glamorous, I know.",
      code: `# main.tscn tree (build this in the editor)
Main (Node2D)
├─ Player (CharacterBody2D)   # next step
└─ Floor (StaticBody2D)       # after that`,
      tip: "Always save scenes early. Future-you hates untitled.tscn*",
    },
    {
      title: "2. Player body",
      body: "Add CharacterBody2D named Player. Child it with a CollisionShape2D (RectangleShape2D) and a ColorRect or Sprite2D so you can see your masterpiece.",
      code: `# Attach player.gd to CharacterBody2D
extends CharacterBody2D

@export var speed := 220.0
@export var jump_velocity := -400.0
var gravity: float = ProjectSettings.get_setting("physics/2d/default_gravity")

func _physics_process(delta: float) -> void:
    if not is_on_floor():
        velocity.y += gravity * delta

    if Input.is_action_just_pressed("ui_accept") and is_on_floor():
        velocity.y = jump_velocity

    var dir := Input.get_axis("ui_left", "ui_right")
    velocity.x = dir * speed
    move_and_slide()`,
      tip: "ui_left / ui_right / ui_accept exist by default. Fancy WASD can wait.",
    },
    {
      title: "3. Floor (so physics isn't a sad infinite fall)",
      body: "Add StaticBody2D named Floor. Give it CollisionShape2D with a wide RectangleShape2D. Park it under the player like a responsible adult.",
      code: `# No script required for a boring floor.
# Position Floor below the player.
# Make the shape wide enough that you can't walk off immediately
# (unless you enjoy teaching void deaths on day one).`,
      tip: "If you fall forever: either no floor, wrong collision layers, or you yeeted the player into the abyss.",
    },
    {
      title: "4. Camera (optional flex)",
      body: "Add Camera2D as a child of Player and enable Current. Now the world revolves around you. As it should.",
      code: `# Player
# └─ Camera2D  (Current = on)`,
      tip: "Too dizzy? Lower camera drag in the inspector later.",
    },
    {
      title: "5. Run it",
      body: "Press F5, pick main.tscn as main scene. Arrow keys move, Space (ui_accept) jumps. If nothing moves, check the script is attached and Input Map still has default ui_* actions.",
      code: `# Common oops checklist
# [ ] Script attached to CharacterBody2D (not the ColorRect)
# [ ] CollisionShape2D has a shape assigned
# [ ] Floor also has a collision shape
# [ ] You're using _physics_process, not _process, for move_and_slide`,
      tip: "move_and_slide() in Godot 4 takes NO velocity argument. Set velocity, then call it.",
    },
    {
      title: "6. Tiny upgrades (when ego demands it)",
      body: "Add coyote time, variable jump height, or a second platform. Or ship this rectangle platformer and call it 'atmospheric'.",
      code: `# Variable jump (short hop if you tap)
if Input.is_action_just_released("ui_accept") and velocity.y < 0.0:
    velocity.y *= 0.5`,
      tip: "You just built the skeleton every metroidvania starts as. You're welcome.",
    },
  ],
  quiz: [
    {
      q: "Why _physics_process for the player?",
      a: "Movement/collision should sync with the physics step — not the render framerate.",
    },
    {
      q: "What does is_on_floor() need to work?",
      a: "A colliding floor + calling move_and_slide() so Godot updates floor state.",
    },
  ],
};

export const PONG_TUTORIAL = {
  id: "pong",
  title: "Ping Pong vs Computer",
  subtitle: "Two paddles, one ball, zero excuses",
  roast: "The AI paddle tracks the ball. You track your dignity. Let's see who wins.",
  time: "~30 min",
  goals: [
    "Build player paddle, AI paddle, ball, and walls",
    "Bounce the ball with simple collision math",
    "Make a computer opponent that follows the ball (mildly smug)",
    "Keep score like it matters (it does)",
  ],
  steps: [
    {
      title: "1. Scene layout",
      body: "Root Node2D named Pong. Add: PlayerPaddle, AiPaddle, Ball (all CharacterBody2D or AnimatableBody2D — CharacterBody2D is fine for learning), plus Walls (StaticBody2D top/bottom).",
      code: `Pong (Node2D)
├─ PlayerPaddle (CharacterBody2D + CollisionShape2D)
├─ AiPaddle (CharacterBody2D + CollisionShape2D)
├─ Ball (CharacterBody2D + CollisionShape2D)
├─ WallTop (StaticBody2D)
├─ WallBottom (StaticBody2D)
└─ UI (CanvasLayer → Labels for score)`,
      tip: "Portrait paddles = tall thin rectangles. Ball = small square. Art direction: 'early access'.",
    },
    {
      title: "2. Player paddle",
      body: "Move only on Y with up/down. Clamp so you don't leave the arena like a coward.",
      code: `extends CharacterBody2D

@export var speed := 400.0

func _physics_process(delta: float) -> void:
    var dir := Input.get_axis("ui_up", "ui_down")
    velocity = Vector2(0, dir * speed)
    move_and_slide()
    position.y = clamp(position.y, 40.0, 608.0)  # tune to your window`,
      tip: "get_axis(up, down) feels backwards if you swap args — don't invent new physics today.",
    },
    {
      title: "3. Ball with attitude",
      body: "Give the ball a starting velocity. On collision with paddles/walls, bounce. Simplest learning version: flip x or y.",
      code: `extends CharacterBody2D

var speed := 320.0
var direction := Vector2(1, 0.6).normalized()

func _ready() -> void:
    velocity = direction * speed

func _physics_process(delta: float) -> void:
    var collision := move_and_collide(velocity * delta)
    if collision:
        var n := collision.get_normal()
        velocity = velocity.bounce(n)
        # Optional spice: speed up slightly each hit
        velocity = velocity.limit_length(520.0)`,
      tip: "move_and_collide is great for pong. move_and_slide is overkill for a single ball with bounce.",
    },
    {
      title: "4. AI paddle (the rival)",
      body: "Every frame, nudge toward the ball's Y. Cap speed so it's beatable… unless you enjoy suffering.",
      code: `extends CharacterBody2D

@export var speed := 280.0
@onready var ball: Node2D = $"../Ball"

func _physics_process(delta: float) -> void:
    if ball == null:
        return
    var target_y := ball.global_position.y
    var diff := target_y - global_position.y
    # Deadzone so it doesn't jitter like espresso
    if abs(diff) < 8.0:
        velocity = Vector2.ZERO
    else:
        velocity = Vector2(0, sign(diff) * speed)
    move_and_slide()
    position.y = clamp(position.y, 40.0, 608.0)`,
      tip: "AI too hard? Lower speed. Too easy? You love compliments. Raise it.",
    },
    {
      title: "5. Scoring",
      body: "If the ball passes the left/right edge, award a point, reset ball to center with a fresh direction. Display scores on Labels.",
      code: `# On Pong root script
var player_score := 0
var ai_score := 0

func goal(scored_by_player: bool) -> void:
    if scored_by_player:
        player_score += 1
    else:
        ai_score += 1
    $UI/PlayerScore.text = str(player_score)
    $UI/AiScore.text = str(ai_score)
    $Ball.reset()  # write a reset() that recenters + new velocity

# In Ball: if position.x < 0: get_parent().goal(false)
#          if position.x > arena_width: get_parent().goal(true)`,
      tip: "First to 5 wins. Loser writes a flashcard. House rules.",
    },
    {
      title: "6. Polish pass",
      body: "Add a serve delay, beep on hit (AudioStreamPlayer), or trail. Or ship it raw and tell friends it's 'minimalist'.",
      code: `func reset() -> void:
    global_position = Vector2(576, 324)  # center-ish
    var x := 1 if randf() > 0.5 else -1
    var y := randf_range(-0.7, 0.7)
    velocity = Vector2(x, y).normalized() * speed`,
      tip: "You now have PvE pong. The computer still doesn't care — but you do.",
    },
  ],
  quiz: [
    {
      q: "Why use move_and_collide for the ball?",
      a: "You get collision info (normal) to bounce cleanly with velocity.bounce(normal).",
    },
    {
      q: "How do you keep AI fair?",
      a: "Limit AI paddle speed and add a small deadzone so it isn't frame-perfect.",
    },
  ],
};
